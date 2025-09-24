# GitHub Copilot Agent Permissions Configuration

## Overview
This document outlines the required permissions for the GitHub Copilot agent to operate effectively on the Digital Allies repository.

## Required Permissions

### Repository-Level Permissions
- **Contents**: `write` - Read and write access to all repository files across all branches
- **Issues**: `write` - Full access to create, read, update, and manage issues  
- **Pull Requests**: `write` - Full access to create, read, update, and manage pull requests
- **Actions**: `write` - Read and execute GitHub Actions workflows
- **Metadata**: `read` - Access to repository metadata and configuration
- **Administration**: `read` - Read access to repository settings (for configuration)

### Branch Protection
- **All branches**: The agent should have permissions across all branches in the repository
- **No branch restrictions**: Permissions apply to main, develop, and all feature branches

## Implementation Methods

### Method 1: GitHub App (Recommended)
1. Navigate to GitHub Developer Settings
2. Create a new GitHub App using the manifest in `.github/github-app-manifest.json`
3. Install the app on the repository
4. Configure the permissions as specified above

### Method 2: Personal Access Token (Alternative)
1. Generate a PAT with the following scopes:
   - `repo` (full repository access)
   - `workflow` (GitHub Actions access)
   - `write:discussion` (for discussions if needed)
2. Configure the token in repository secrets or organization settings

### Method 3: Repository Settings (Organization Level)
1. Go to Repository Settings > Actions > General
2. Configure workflow permissions to "Read and write permissions"
3. Enable "Allow GitHub Actions to create and approve pull requests"
4. Set up branch protection rules with appropriate bypass permissions

## Verification

### Workflow Test Requirements
The `copilot-permissions-test.yml` workflow requires the following to pass successfully:

**Basic Tests (always run):**
- Repository checkout permissions ✅
- File read permissions ✅  
- File write permissions ✅
- Branch access permissions ✅
- Actions metadata access ✅

**Extended Tests (manual trigger only):**
- Issue creation/management (`test_type: 'issues'`)
- Pull request management (`test_type: 'pull_requests'`)

### Running the Permissions Test
1. **Automatic Basic Test**: Runs on push to main and PR creation
2. **Manual Extended Test**: Go to Actions → "Copilot Agent Permissions Test" → "Run workflow"
   - Choose test type: `basic`, `files`, `issues`, or `pull_requests`

### Common Test Failure Causes
- **Permission denied errors**: Repository settings don't allow workflow token sufficient access
- **API rate limits**: Too many test runs in short period
- **Branch protection rules**: Prevent automated PR creation
- **Missing GITHUB_TOKEN permissions**: Token lacks required scopes

### Troubleshooting Test Failures
1. Check repository Settings → Actions → General → Workflow permissions
2. Ensure "Read and write permissions" is enabled
3. Enable "Allow GitHub Actions to create and approve pull requests"
4. For organization repositories, check organization-level restrictions

### Testing Permissions
After configuration, verify the agent can:
- [ ] Read all files from any branch
- [ ] Create and modify files in the repository  
- [ ] Create, update, and close issues
- [ ] Create, update, and merge pull requests
- [ ] Trigger and interact with GitHub Actions workflows
- [ ] Access repository metadata and settings

### Security Considerations
- Regular permission audits recommended
- Monitor agent activity through GitHub audit logs
- Implement branch protection rules where appropriate
- Consider least-privilege principle for production branches

## Support
For issues with permissions configuration, contact:
- Repository administrators: @cassellac
- GitHub Support for platform-level issues
- Digital Allies technical team via website contact form

---
*Last updated: [Date will be auto-updated when file is modified]*
*Repository: cassellac/DigitalAllies_*