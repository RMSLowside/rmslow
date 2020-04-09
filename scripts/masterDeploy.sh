#!/bin/bash
cd ~
mkdir deploy
cd deploy
git clone git@github.com:RMSLowside/rmslow.git
cd rmslow/rms-frontend
npm install
cd apps
for APP in $(find -maxdepth 1 -type d)
do
    if [ ! $APP == '.' ] && [ ! ${APP: -3} == 'e2e' ]
    then
    ng build ${APP:2} --base-href "./"
    fi
done
cd ..
ngh
cd ~
rm -rf deploy
