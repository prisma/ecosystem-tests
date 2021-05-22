#!/bin/sh

set -eux

yarn test

# now kill the parent process when tests are done
kill $PPID
