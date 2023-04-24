#!/bin/sh

set -eu

# Yarn 1 has the following issue https://github.com/yarnpkg/yarn/issues/7807 
# which shows with the following error in our `check-for-update` job":
# error An unexpected error occurred: "expected workspace package to exist for \"@babel/core\"".
# Solution: downgrading yarn with:
yarn policies set-version 1.18.0
