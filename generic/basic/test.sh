#!/bin/sh

set -eux

yarn -s m1
arch -arm64e yarn -s m1
yarn -s m1-arm64
arch -arm64e yarn -s m1-arm64
node ./m1.js
arch -arm64e node ./m1.js

yarn -s cmd

uname -a
arch -arm64e uname -a