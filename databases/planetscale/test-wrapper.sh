#!/bin/sh

set -eux

yarn test

# no kill the parent process as well
kill $PPID
