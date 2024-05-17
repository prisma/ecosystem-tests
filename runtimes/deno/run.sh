#!/usr/bin/env bash

set -eu

version=$( jq -r  '.devDependencies.prisma' package.json ) 
rm package.json

cd runtimes/deno
deno run -A npm:prisma@$version generate