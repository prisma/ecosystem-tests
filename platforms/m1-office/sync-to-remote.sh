#!/bin/sh

set -eux

sshpass -p$MACHINE_SECRET ssh -tt github@$MACHINE_IP "echo 'hello world' && uname"

echo "Sync: Removing local node_modules"
rm -rf ./code/node_modules

echo "Sync: Create remote folder"
sshpass -p$MACHINE_SECRET ssh -tt github@$MACHINE_IP "mkdir -p /Users/github/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE"

echo "Sync: Copying new code to unique folder"
sshpass -p$MACHINE_SECRET scp -rp ./code/* github@$MACHINE_IP:/Users/github/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE/

echo "sync-to-remote done"
