#!/bin/bash
cd ~/git/rmslow/rms-frontend

PS3='Is this store for an Application or a Library?'
options=("Application" "Library")
select opt in "${options[@]}"
do
    case $opt in
        "Application")
            chosen="app"
            break
            ;;
        "Library")
            chosen="lib"
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done


PS3="Which $opt?"
arr=()
cd ${chosen}s
for APP in $(find -maxdepth 1 -type d)
do
    if [ ! $APP == '.' ] && [ ! ${APP: -3} == 'e2e' ]
    then
    arr+=( ${APP:2} )
    fi
done
select answer in "${arr[@]}"
do
  for item in "${arr[@]}"; do
    if [[ $item == $answer ]]; then
      src=$item
      break 2
    fi
  done
done


echo What is the name of the store

read name

ng g @ngxs/schematics:store --name ${name} --spec --path ${src}/src/${chosen}/+state --sourceRoot ${chosen}s
