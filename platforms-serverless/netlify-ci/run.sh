#!/bin/sh

set -eu

# When PRISMA_FORCE_NAPI is set, overwrite existing schema file with one that enables the napi preview feature
if [[ -z "${PRISMA_FORCE_NAPI+x}" ]]; then
  # use the default schema at prisma/schema.prisma file
  true
else
  cp ./prisma/schema-with-napi.prisma ./prisma/schema.prisma
fi

rm -rf node_modules/
yarn install

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
git commit -m "push to netlify"
git push origin master --force
rm -rf .git
