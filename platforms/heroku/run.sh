#!/bin/sh

set -eux

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests platforms heroku build'

git init
git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

pnpm heroku git:remote -a e2e-platforms-heroku

pnpm install
pnpm prisma generate

git add .
git commit -m "push to heroku"
git push heroku master --force
rm -rf .git
