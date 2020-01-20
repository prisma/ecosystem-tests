#!/bin/sh

set -eu

yarn
yarn now --token=$ZEIT_TOKEN --prod
sleep 5
sh test.sh
