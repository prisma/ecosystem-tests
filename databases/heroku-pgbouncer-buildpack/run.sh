#!/bin/sh

set -eux

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests databases heroku-pgbouncer-buildpack build'
pnpm install
pnpm prisma generate

git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

git init
git remote add heroku "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-buildpack-pgbouncer.git" || git remote set-url heroku "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-buildpack-pgbouncer.git" || true
git add .
git commit -m "push to heroku"
git push heroku master --force
rm -rf .git
