#!/bin/sh

set -eux

echo "Sync: Syncing code to EC2"

echo "Sync: Removing local node_modules"
rm -rf ./code/node_modules

echo "Sync: Removing existing code"
ssh -tt -i ./server-key.pem administrator@207.254.29.83 'rm -rf /Users/administrator/e2e-tests'

echo "Sync: Copying new code"
scp -i ./server-key.pem -rp ./code administrator@207.254.29.83:/Users/administrator/e2e-tests/
