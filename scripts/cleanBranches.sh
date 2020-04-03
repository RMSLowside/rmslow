git checkout master
git branch | grep -v "master" | xargs git branch -D 
git fetch --prune