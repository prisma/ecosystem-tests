#!/bin/sh

set -eux

echo "Sync: Syncing code to EC2"

echo "Sync: Removing local node_modules"
rm -rf ./code/node_modules

echo "Sync: Create remote folder"
ssh -tt -i ./server-key.pem administrator@$MACHINE_IP "mkdir -p /Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE"

echo "Sync: Copying new code to unique folder"
scp -i ./server-key.pem -rp ./code/* administrator@$MACHINE_IP:/Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE/

echo "sync-to-remote done"
