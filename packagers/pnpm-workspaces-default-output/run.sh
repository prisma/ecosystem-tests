#!/bin/sh

set -eu

cd workspace

cp ../package.json sub-project-1
cp ../package.json sub-project-2

pnpm install
pnpm -r run generate
