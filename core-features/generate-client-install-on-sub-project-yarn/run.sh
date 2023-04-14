#!/bin/sh

set -eux

yarn install

cp package.json sub-project

cd sub-project
bash run.sh
