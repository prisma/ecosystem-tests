#!/bin/sh

set -eu

# TODO Why do we do this?
cp ./code/package.json ./package.json

echo "Disabling StrictHostKeyChecking"
mkdir -p ~/.ssh
ssh-keyscan 54.72.209.131 >> ~/.ssh/known_hosts
echo "$SSH_KEY_GRAVITON" > ./server-key.pem

if test -f "./server-key.pem"; then
    chmod 600 ./server-key.pem
fi
