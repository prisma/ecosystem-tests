#!/bin/sh

set -eu

git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

git init
git remote add origin "git@github.com:prisma/prisma2-e2e-tests-netlify.git" 
git add .
git commit -m "push to netlify"
git push origin master --force
rm -rf .git

sleep 60 # Enough time for the netlify build to go through
sh test.sh
