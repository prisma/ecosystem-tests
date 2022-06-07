#!/usr/bin/env bash

set -eu

yarn install

yarn prisma generate --data-proxy

yarn wrangler publish 2> deployment-url.txt