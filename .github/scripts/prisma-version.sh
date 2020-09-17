#!/bin/bash

set -eu
shopt -s inherit_errexit || true

channel="$1"

yarn info "@prisma/cli@$channel" --json | jq ".data[\"dist-tags\"][\"$channel\"]" | tr -d '"'
