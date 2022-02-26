#!/bin/sh

set -eux

echo "Sync: Syncing code to EC2"

echo "Sync: Removing local node_modules"
rm -rf ./code/node_modules

echo "Sync: Create remote folder"
ssh -tt -i ./server-key.pem ec2-user@54.72.209.131 "mkdir -p /home/ec2-user/aws-graviton/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE"

echo "Sync: Copy code to unique folder"
scp -i ./server-key.pem -rp ./code/* ec2-user@54.72.209.131:/home/ec2-user/aws-graviton/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE/

echo "sync-to-remote done"
