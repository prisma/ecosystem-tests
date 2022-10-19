#!/usr/bin/env bash

set -eu

version=$( jq -r  '.devDependencies.prisma' package.json ) 

deno run -A --unstable npm:prisma@$version generate --data-proxy
