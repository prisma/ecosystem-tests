#!/bin/sh

set -eu

yarn
yarn now --token=$ZEIT_TOKEN --prod
sleep 250
sh test.sh
