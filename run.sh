#!/bin/sh

set -eu

dir=$1
project=$2

echo "running $dir/$project"

cd "$dir/$project"
sh run.sh

echo "$dir/$project done"
