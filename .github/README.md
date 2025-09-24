# GitHub Configuration for Digital Allies

This directory contains GitHub-specific configuration files for the Digital Allies repository.

## Files Overview

### Configuration Files

- **`copilot-instructions.md`** - Comprehensive instructions for GitHub Copilot agents working with this repository
- **`COPILOT_PERMISSIONS.md`** - Detailed documentation of required permissions for Copilot agents
- **`github-app-manifest.json`** - GitHub App manifest template for setting up proper permissions

### Workflows

- **`workflows/copilot-permissions-test.yml`** - GitHub Actions workflow to test and verify Copilot agent permissions

## Quick Setup Guide

### For Repository Administrators

1. **Review Permission Requirements**: See `COPILOT_PERMISSIONS.md` for complete permission specifications

2. **Choose Implementation Method**:
   - **GitHub App** (Recommended): Use `github-app-manifest.json` as a template
   - **Personal Access Token**: Generate with required scopes
   - **Repository Settings**: Configure workflow permissions appropriately

3. **Verify Setup**: Run the permissions test workflow to confirm all permissions are working

### For Copilot Agents

1. **Read Instructions**: Review `copilot-instructions.md` for repository-specific guidance
2. **Understand Permissions**: Check `COPILOT_PERMISSIONS.md` for your access scope
3. **Test Access**: Trigger the test workflow to verify your permissions

## Permission Summary

The Copilot agent is configured to have:
- ✅ **Full repository access** (read/write all files, all branches)
- ✅ **Issues management** (create, update, close issues)
- ✅ **Pull requests management** (create, update, merge PRs)
- ✅ **GitHub Actions access** (trigger workflows, read run data)

## Security Notes

- All permissions are scoped to this repository only
- Regular permission audits are recommended
- Monitor agent activity through GitHub audit logs
- Branch protection rules may still apply

## Support

For configuration issues:
- Repository Admin: @cassellac  
- Technical Issues: See repository README.md for contact information
- GitHub Platform Issues: Contact GitHub Support

---

**Repository**: `cassellac/DigitalAllies_`  
**Last Updated**: Auto-updated when files are modified  
**Maintainer**: Digital Allies Team