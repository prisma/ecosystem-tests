#!/usr/bin/env bash

set -eu

version=$( jq -r  '.devDependencies.prisma' package.json ) 
rm package.json

deno run -A npm:prisma@$version generate