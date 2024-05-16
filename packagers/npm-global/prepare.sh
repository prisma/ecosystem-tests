#!/bin/sh

mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
NPM_CONFIG_PREFIX=~/.npm-global
PATH=~/.npm-global/bin:$PATH
