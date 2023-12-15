#!/bin/sh

set -eux

ssh -tt github@$MACHINE_IP "echo 'hello world' && uname"

# echo "Sync: Removing local node_modules"
# rm -rf ./code/node_modules

# echo "Sync: Create remote folder"
# ssh -tt github@$MACHINE_IP "mkdir -p /Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE"

# echo "Sync: Copying new code to unique folder"
# scp -rp ./code/* github@$MACHINE_IP:/Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE/

# echo "sync-to-remote done"
