#!/usr/bin/env bash

set -eu

yarn install

echo "USING $PRISMA_CLIENT_ENGINE_TYPE"

yarn prisma generate
