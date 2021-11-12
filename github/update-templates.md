# Update template sources from the original template

### Updating from template

Fetch from the \`template\` remote. If you cloned via Github, you will need to add the remote origin.

```shell
# Add template repository
git remote add template https://github.com/ctwhome/top-vite

# Update repo
git fetch --all 

# Merge the branch you want from the remote template
git merge template/main --allow-unrelated-histories
```
