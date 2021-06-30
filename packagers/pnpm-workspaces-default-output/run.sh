#!/bin/sh

set -eu

cd workspace
cp ../package.json sub-project-1
cp -r sub-project-1 sub-project-2

pnpm install
pnpm -r generate
