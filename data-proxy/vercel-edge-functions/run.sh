#!/usr/bin/env bash

set -eu

yarn install

yarn prisma generate

yarn -s vercel --token=$VERCEL_TOKEN --env PRISMA_CLIENT_ENGINE_TYPE="dataproxy" --prod --scope=prisma --confirm --force 1> deployment-url.txt
