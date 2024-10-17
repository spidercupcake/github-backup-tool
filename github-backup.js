#!/usr/bin/env node

import { program } from "commander";
import { Octokit } from "@octokit/rest";
import simpleGit from "simple-git";
import cron from "node-cron";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function getRepositories(username) {
  try {
    const { data } = await octokit.repos.listForUser({ username });
    return data.map((repo) => ({
      name: repo.name,
      clone_url: repo.clone_url,
      private: repo.private,
    }));
  } catch (error) {
    console.error(
      `Error fetching repositories for user ${username}: ${error.message}`
    );
    throw error;
  }
}

async function backupRepository(repo, backupDir) {
  const repoDir = path.join(backupDir, repo.name);
  if (!fs.existsSync(repoDir)) {
    fs.mkdirSync(repoDir, { recursive: true });
  }

  const git = simpleGit();
  try {
    await git.clone(repo.clone_url, repoDir);
    console.log(`Successfully backed up ${repo.name}`);
  } catch (error) {
    console.error(`Failed to backup ${repo.name}: ${error.message}`);
  }
}

async function performBackup(username, backupDir, includePrivate = false) {
  try {
    const repos = await getRepositories(username);
    for (const repo of repos) {
      if (includePrivate || !repo.private) {
        await backupRepository(repo, backupDir);
      }
    }
    console.log("Backup completed successfully");
  } catch (error) {
    console.error("Backup failed:", error.message);
  }
}

program
  .version("1.0.0")
  .description("A CLI tool to backup GitHub repositories");

program
  .command("backup <username> <backupDir>")
  .option("-p, --private", "Include private repositories")
  .option("-s, --schedule <cron>", "Schedule backups using cron syntax")
  .action((username, backupDir, options) => {
    const backupFunction = () =>
      performBackup(username, backupDir, options.private);

    // Check if backupDir is valid
    if (!fs.existsSync(backupDir)) {
      console.error(`Backup directory does not exist: ${backupDir}`);
      return;
    }

    if (options.schedule) {
      console.log(`Scheduling backups with cron: ${options.schedule}`);
      cron.schedule(options.schedule, backupFunction);
    } else {
      backupFunction();
    }
  });

program.parse(process.argv);

// Remove unused React component export if not needed
// export default function Component() {
//   return null;
// }
