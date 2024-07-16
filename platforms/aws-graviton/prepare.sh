#!/bin/sh

set -eu

echo "Disabling StrictHostKeyChecking"
mkdir -p ~/.ssh
ssh-keyscan ec2-54-209-135-27.compute-1.amazonaws.com >> ~/.ssh/known_hosts
echo "$SSH_KEY_GRAVITON" > ./server-key.pem

if test -f "./server-key.pem"; then
    chmod 600 ./server-key.pem
fi

ssh -tt -i ./server-key.pem ec2-user@ec2-54-209-135-27.compute-1.amazonaws.com "ls -la /home/ec2-user/aws-graviton/platforms"