#!/bin/sh

set -eu

yarn
yarn now --token=$ZEIT_TOKEN --prod
sh test.sh
