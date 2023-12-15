#!/bin/sh

set -eu

MACHINE_IP=192.168.1.192

echo "Disabling StrictHostKeyChecking"
mkdir -p ~/.ssh
ssh-keyscan $MACHINE_IP >> ~/.ssh/known_hosts
# echo "$SSH_KEY_M1_MACSTADIUM" > ./server-key.pem

# if test -f "./server-key.pem"; then
#     chmod 600 ./server-key.pem
# fi
