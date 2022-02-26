#!/bin/sh

set -eux

cd       packages/sub-project-1 && sh test.sh &&
cd ../../packages/sub-project-2 && sh test.sh
