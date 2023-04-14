#!/bin/sh

set -eux

pnpm install

cp package.json sub-project

cd sub-project
bash run.sh
