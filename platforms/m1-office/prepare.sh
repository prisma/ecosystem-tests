#!/bin/sh

set -eu

MACHINE_IP=207.254.29.83

echo "Disabling StrictHostKeyChecking"
mkdir -p ~/.ssh
ssh-keyscan $MACHINE_IP >> ~/.ssh/known_hosts
echo "$SSH_KEY_M1_MACSTADIUM" > ./server-key.pem

# ?TODO

if test -f "./server-key.pem"; then
    chmod 600 ./server-key.pem
fi
