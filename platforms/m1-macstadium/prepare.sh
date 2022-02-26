#!/bin/sh

set -eu

echo "Disabling StrictHostKeyChecking"
mkdir -p ~/.ssh
ssh-keyscan 207.254.29.83 >> ~/.ssh/known_hosts
echo "$SSH_KEY_M1_MACSTADIUM" > ./server-key.pem

if test -f "./server-key.pem"; then
    chmod 600 ./server-key.pem
fi
