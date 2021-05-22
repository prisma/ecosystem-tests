#!/bin/sh

set -eu

pscale connect e2e-tests main --execute-protocol 'mysql' --debug --execute 'test-wrapper.sh' 

#<-- Does not work because of "Query engine exited with code 1"

#pscale connect e2e-tests main &
#pid=$!

#sleep 5

#yarn test

#kill $pid
