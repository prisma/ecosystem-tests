#!/bin/sh

set -eu

yarn
yarn now --token=$ZEIT_TOKEN --prod
sleep 15

set +e
sh test.sh
code=$?
set -e
now logs e2e-platforms-zeit-now.now.sh --token=$ZEIT_TOKEN
exit $code
