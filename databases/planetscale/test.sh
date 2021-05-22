#!/bin/sh

set -eu

pscale connect e2e-tests main --execute-protocol 'mysql' --debug --execute './test-wrapper.sh'
