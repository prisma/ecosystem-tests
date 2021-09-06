#!/bin/sh

# workaround so `npm i -g` can work
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
NPM_CONFIG_PREFIX=~/.npm-global
PATH=~/.npm-global/bin:$PATH

npm i -g pnpm@latest
