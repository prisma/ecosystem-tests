#!/bin/sh

set -eu

echo "Sync: Syncing code to EC2"

echo "Sync: Removing local node_modules"
rm -rf ./code/node_modules

echo "Sync: Removing existing remote ode"
ssh -tt -i ./server-key.pem ec2-user@54.72.209.131 'rm -rf /home/ec2-user/aws-graviton'

echo "Sync: Copying new local code to remote"
scp -i ./server-key.pem -rp ./code ec2-user@54.72.209.131:/home/ec2-user/aws-graviton/
