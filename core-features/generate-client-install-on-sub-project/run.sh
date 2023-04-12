#!/bin/sh

set -eux

pnpm install

cp -r node_modules sub-project
cp package.json sub-project

cd sub-project
bash run.sh
