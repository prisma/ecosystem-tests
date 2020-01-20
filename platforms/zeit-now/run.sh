#!/bin/sh

set -eu

echo $ZEIT_TOKEN
yarn now --token=$ZEIT_TOKEN --prod
sh test.sh
