#!/bin/sh

set -eux

npm install

cp package.json sub-project

cd sub-project
bash run.sh
