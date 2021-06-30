#!/bin/sh

# mkdir -p ~/.npm-global
# npm config set prefix '~/.npm-global'
# NPM_CONFIG_PREFIX=~/.npm-global
# PATH=~/.npm-global/bin:$PATH
# npm i -g pnpm@latest

cp package.json sub-project-1/package.json
cp -r sub-project-1 sub-project-2
rm package.json