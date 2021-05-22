#!/bin/sh

set -eu

pscale connect e2e-tests main --execute-protocol 'mysql' --debug --execute './test-wrapper.sh' 

# have to exit 0 manually, as `pscale` above is killed from the inside
exit 0
