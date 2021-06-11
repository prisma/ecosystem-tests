#!/bin/sh

set -eux

git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

git init
git remote add heroku "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-platforms-heroku.git" || git remote set-url heroku "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-platforms-heroku.git" || true
git add .
git commit -m "push to heroku"
git push heroku master --force
rm -rf .git
