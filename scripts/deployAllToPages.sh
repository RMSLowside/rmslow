#!/bin/bash
cd ~/git/rmslow/rms-frontend/apps
for APP in $(find -maxdepth 1 -type d)
do
    if [ ! $APP == '.' ] && [ ! ${APP: -3} == 'e2e' ]
    then
    ng build ${APP:2} --base-href "./"
    fi
done
cd ..
ngh