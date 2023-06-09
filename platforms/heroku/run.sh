#!/bin/sh

set -eux

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests platforms heroku build'

git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

# When PRISMA_CLIENT_ENGINE_TYPE is set to binary, overwrite existing schema file with one that sets the engineType to `binary`
if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  echo "Using Binary enabled schema"
  cp ./prisma/schema-with-binary.prisma ./prisma/schema.prisma
else
  echo "Using Node-API enabled schema"
  cp ./prisma/schema-with-node-api.prisma ./prisma/schema.prisma
fi

pnpm install
pnpm prisma generate

git clone "https://ignored_user:`heroku auth:token`@git.heroku.com/e2e-platforms-heroku-binary.git" heroku_clone
cd heroku_clone
# Remove all files from git, so we don't keep deleted files
git rm -r '*'
cp ../prisma .gitignore ../index.js ../package.json ../pnpm-lock.yaml ./
# Add files to git
git add .
git commit -m "push to heroku"
git push heroku master --force
cd ../

rm -rf heroku_clone
