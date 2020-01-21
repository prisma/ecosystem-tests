#!/bin/sh

set -eu

yarn install
yarn prisma2 generate

# sh build.sh // Should run after the commit in netlify CI
# sh test.sh // To be run after build.sh (via build.sh) in the netlify CI

# git config --global user.email "prismabots@gmail.com"
# git config --global user.name "Prismo"
git config --global user.email "singh@prisma.io"
git config --global user.name "Divyendu Singh"

git init
git remote add origin "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-platforms-heroku.git" || git remote set-url heroku "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-platforms-heroku.git" || true
git add .
git commit -m "push to heroku"
git push heroku master --force
rm -rf .git