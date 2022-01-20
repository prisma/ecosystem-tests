#!/bin/sh

set -eux

# enable debug all logs
export DEBUG="*"

yarn test
