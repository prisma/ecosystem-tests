#!/usr/bin/env bash

set -eu

yarn install

yarn prisma generate --data-proxy
