#!/bin/sh

set -eux

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests platforms heroku build'

git init
git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

# When PRISMA_CLIENT_ENGINE_TYPE is set to binary, overwrite existing schema file with one that sets the engineType to `binary`
if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  echo "Using Binary enabled schema"
  cp ./prisma/schema-with-binary.prisma ./prisma/schema.prisma
  git remote add heroku "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-platforms-heroku-binary.git" || git remote set-url heroku "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-platforms-heroku-binary.git" || true
else
  echo "Using Node-API enabled schema"
  cp ./prisma/schema-with-node-api.prisma ./prisma/schema.prisma
  git remote add heroku "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-platforms-heroku.git" || git remote set-url heroku "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-platforms-heroku.git" || true
fi

pnpm install

git pull
# Remove all files from git
# So we don't keep deleted filed
git rm -r '*'

pnpm prisma generate

# Add files to git
git add .

git commit -m "push to heroku"
git push heroku master --force

rm -rf .git
