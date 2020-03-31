#!/bin/sh

set -eu

yarn
yarn now --token=$ZEIT_TOKEN --prod --scope=prisma
sleep 15
