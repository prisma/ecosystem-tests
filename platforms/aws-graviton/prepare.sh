#!/bin/sh

set -eu

cp ./code/package.json ./package.json

if [ "$OSTYPE" = "linux" ]; then
    echo "Disabling StrictHostKeyChecking"
    mkdir -p ~/.ssh
    ssh-keyscan 54.72.209.131 >> ~/.ssh/known_hosts

    echo "$SSH_KEY_GRAVITON" > ./server-key.pem
fi

if test -f "./server-key.pem"; then
    chmod 600 ./server-key.pem
fi
