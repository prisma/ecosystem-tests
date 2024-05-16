#!/bin/sh

# Note: This script is not actually used anywhere!

set -eux

echo "Sync: Syncing code from EC2"

echo "Sync: Removing existing local code"
rm -rf ./code

echo "Sync: Removing remote node_modules on server"
ssh -tt -i ./server-key.pem ec2-user@ec2-54-209-135-27.compute-1.amazonaws.com 'rm -rf /home/ec2-user/aws-graviton/node_modules'

echo "Sync: Copying remote code from EC2 to local"
scp -i ./server-key.pem -rp ec2-user@ec2-54-209-135-27.compute-1.amazonaws.com:/home/ec2-user/aws-graviton/ .

echo "Sync: Renaming local aws-graviton/ to code/"
mv aws-graviton/ code/
rm -rf code/node_modules
