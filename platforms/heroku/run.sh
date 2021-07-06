#!/bin/sh

set -eux

# When PRISMA_FORCE_NAPI is set, overwrite existing schema file with one that enables the napi preview feature
if [[ -z "${PRISMA_FORCE_NAPI+x}" ]]; then
  # use the default schema at prisma/schema.prisma file
  true
else
  cp ./prisma/schema-with-napi.prisma ./prisma/schema.prisma
fi

git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

git init
git remote add heroku "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-platforms-heroku.git" || git remote set-url heroku "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-platforms-heroku.git" || true
git add .
git commit -m "push to heroku"
git push heroku master --force
rm -rf .git
