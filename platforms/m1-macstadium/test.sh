#!/bin/sh

set -eux

ssh -i ./server-key.pem administrator@207.254.29.83 -tt "
    cd /Users/administrator/e2e-tests/; 
    yarn m1;
"
