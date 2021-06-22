#!/bin/sh

set -eu

ID=$(date +%s%N)
echo ID > id.txt

# When PRISMA_FORCE_NAPI is set, overwrite existing schema file with one that enables the napi preview feature
if [[ -z "${PRISMA_FORCE_NAPI+x}" ]]; then
  # use the default schema at prisma/schema.prisma file
  echo "Using normal schema"
  ENGINE='binary'
  true
else
  echo "Using Napi enabled schema"
  ENGINE='node-api libary'
  cp ./prisma/schema-with-napi.prisma ./prisma/schema.prisma
fi

# Modify package.json to bust cache
sed -i "s/netlify-ci-to-be-replace-on-build/$(date +%s%N)/" package.json

# Set up project
rm -rf node_modules/
yarn install
yarn prisma generate

# create ssh key
mkdir -p ~/.ssh
echo "$SSH_KEY_NETLIFY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts

# setup git
git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

# push project to Netlify
git init
git remote add origin "git@github.com:prisma/prisma2-e2e-tests-netlify.git"
git add .
git commit -m "push to netlify: $ID, engine = $ENGINE"
# TODO Do not force push so history is available
git push origin $ID
rm -rf .git
