#!/bin/sh

set -eu

ID=$(date +%s%N)
echo $ID > id.txt

# When PRISMA_CLIENT_ENGINE_TYPE is set to `binary`, overwrite existing schema file with one that sets the engineType to 'binary'
if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  echo "Using Binary enabled schema"
  cp ./prisma/schema-with-binary.prisma ./prisma/schema.prisma
else
  # use the default schema at prisma/schema.prisma file
  echo "Using Node-API enabled schema"
  cp ./prisma/schema-with-node-api.prisma ./prisma/schema.prisma
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
git remote add origin "git@github.com:prisma/prisma-ecosystem-tests-netlify-github.git"
git add .
git commit -m "push to netlify: $ID, engine = $PRISMA_CLIENT_ENGINE_TYPE"
# TODO Do not force push so history is available
git branch $ID
git push -u origin $ID
rm -rf .git

sleep 60 # give netlify some time to build and deploy
