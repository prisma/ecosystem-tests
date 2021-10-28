#!/usr/bin/env bash

yarn install
yarn prisma generate
yarn wrangler publish 2> deployment-url.txt