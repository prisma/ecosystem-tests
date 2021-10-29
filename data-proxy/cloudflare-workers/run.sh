#!/usr/bin/env bash

set -eu

yarn install

yarn prisma generate

yarn wrangler publish 2> deployment-url.txt