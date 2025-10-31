#!/bin/sh

set -eu

ID=$(date +%s%N)
echo $ID > id.txt

# Modify package.json to bust cache
# TODO Is this still needed?
sed -i "s/netlify-github-to-be-replaced-on-build/$(date +%s%N)/" package.json

# Set up project
rm -rf node_modules/
pnpm install
pnpm prisma generate

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
git remote add origin "git@github.com:prisma/prisma-ecosystem-tests-netlify-github.git"
git add .
git commit -m "push to netlify: $ID, engine = $PRISMA_CLIENT_ENGINE_TYPE"
# TODO Do not force push so history is available
git branch $ID
git push -u origin $ID
rm -rf .git

sleep 60 # give netlify some time to build and deploy
