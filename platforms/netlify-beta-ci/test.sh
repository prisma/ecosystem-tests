#!/bin/sh

set -eu

prisma_version="$(cat ../../.github/prisma-version.txt)"
node test.js