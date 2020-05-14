#!/bin/sh

set -eu

rm -rf node_modules/
yarn install

mkdir -p ~/.ssh
echo "$SSH_KEY_NETLIFY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts

git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

git init
git remote add origin "git@github.com:prisma/prisma2-e2e-tests-netlify.git"
git add .
git commit -m "push to netlify"
git push origin master --force
rm -rf .git
