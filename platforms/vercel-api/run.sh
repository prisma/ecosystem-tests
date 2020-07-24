#!/bin/sh

set -eu

yarn
yarn vercel --token=$VERCEL_TOKEN --prod --scope=prisma --confirm
sleep 15
