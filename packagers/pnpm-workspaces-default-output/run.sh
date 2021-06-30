#!/bin/sh

set -eu

cp package.json sub-project-1
cp -r sub-project-1 sub-project-2
rm package.json

pnpm install
pnpm -r generate
