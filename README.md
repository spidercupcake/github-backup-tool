# GitHub Backup Tool

A command-line tool to backup GitHub repositories to a specified location. This tool supports both public and private repositories and includes options for scheduling backups.

## Features

- Backup public and private GitHub repositories
- Specify backup location
- Schedule automatic backups using cron syntax
- Easy-to-use command-line interface

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- A GitHub account and personal access token

## Installation

1. Clone this repository or download the source code:

   ```bash
   git clone https://github.com/yourusername/github-backup-tool.git
   cd github-backup-tool
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your GitHub personal access token:

   > Personal Access Token is required for the Backup of Private Repos. Add PAT for the user who's Private repo is to be Backed up. If NO Private Repositories is to be Backed Up, skip this step.

   Here's a step-by-step guide to create your PAT with Required scopes:

   - Log in to your GitHub account.
   - Click on your profile picture in the top-right corner and select "Settings".
   - In the left sidebar, click on "Developer settings".
   - In the left sidebar, click on "Personal access tokens".
   - Click on "Generate new token" (or "Generate new token (classic) " if you see that option).
   - Give your token a descriptive name, e.g., "GitHub Backup Tool".
   - Set an expiration date for your token. For security reasons, it's recommended not to use tokens that don't expire.
   - Under "Select scopes", check the boxes for:

     - `repo` (includes all nested options)
     - `read:user`
     - `user:email`

   - Scroll to the bottom and click "Generate token".
   - Copy your new personal access token immediately. You won't be able to see it again!

   Remember to keep your PAT secure and never share it publicly. When you add it to the `.env` file of the GitHub Backup Tool, it should look like this:

   ```
   GITHUB_TOKEN=your_github_personal_access_token
   ```

   Replace `your_github_personal_access_token` with your actual GitHub token.

4. Make the script executable:

   - For Unix-like systems (Linux, macOS):

     ```bash
     chmod +x github-backup.js
     ```

   - For Windows users:

     You don't need to run chmod. Instead, simply ensure you are in the project directory, and you can run the script directly with Node.js:

     ```bash
     node github-backup.js
     ```

5. (Optional) To use the tool globally, run:

   ```bash
   npm link
   ```

## Usage

### Basic Backup

To perform a one-time backup of public repositories:

```bash
node github-backup.js backup <username> <backup_directory>
```

### Include Private Repositories

To backup both public and private repositories:

```bash
node github-backup.js backup <username> <backup_directory> --private
```

### Schedule Backups

To schedule automatic backups (e.g., daily at midnight):

```bash
node github-backup.js backup <username> <backup_directory> --schedule "0 0 * * *"
```

Replace `<username>` with the GitHub username whose repositories you want to back up, and `<backup_directory>` with the path where you want to store the backups.

If you've linked the tool globally, you can use `github-backup` instead of `node github-backup.js` in the commands above.

## Cron Syntax

The `--schedule` option uses cron syntax. Here are some examples:

- `"0 0 * * *"`: Every day at midnight
- `"0 0 * * 0"`: Every Sunday at midnight
- `"0 0 1 * *"`: First day of every month at midnight
- `"0 */6 * * *"`: Every 6 hours

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This tool is not officially associated with GitHub. Use it at your own risk and ensure you comply with GitHub's terms of service and your repository's license terms when backing up repositories.
