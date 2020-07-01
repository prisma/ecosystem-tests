#!/bin/sh

set -eux

sudo snap install heroku --classic
yarn install
yarn prisma generate

git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

git init
git remote add heroku "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-buildpack-pgbouncer.git" || git remote set-url heroku "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-buildpack-pgbouncer.git" || true
git add .
git commit -m "push to heroku"
git push heroku master --force
rm -rf .git
