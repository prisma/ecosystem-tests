#!/bin/sh

set -eu

yarn
yarn now --token=$ZEIT_TOKEN --prod
sleep 300
sh test.sh
now logs e2e-platforms-zeit-now.now.sh --token=$ZEIT_TOKEN
