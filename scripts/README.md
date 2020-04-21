# Scripts
You may need to mess with your local permissions a bit before these will work

## gitdevelop.sh
Will checkout upstream master, force your master to match, discarding any of your local changes, and then force push your to your master branch of your fork

## cleanBranches.sh
Will discard any of your local branches other than master, and will fetch prune to git rid of any deleted origin branches

## deployToPages.sh
Pass in an app name and it will build it and deploy it to your Github Pages

## deployAllToPages.sh
Will build all the FE apps and deploy them to your GitHub Pages

## masterDeploy.sh
Will make a new directory, pull down the main repo, RMSLowside/rmslow, build all the FEs and deploy them to the main pages

## newStore.sh
Will ask app or lib, then which app or lib, and generate a new store and action file with the name passed in
