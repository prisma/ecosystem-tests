#!/bin/sh

set -eux

MACHINE_IP=192.168.1.192

echo "PRISMA_CLIENT_ENGINE_TYPE = $PRISMA_CLIENT_ENGINE_TYPE"

sshpass -p$MACHINE_SECRET ssh github@$MACHINE_IP -tt "
    cd /Users/github/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE;

    # to get around https://serverfault.com/questions/351731/why-does-the-path-of-an-ssh-remote-command-differ-from-that-of-an-interactive-s
    export PATH=/Users/github/.nvm/versions/node/v20.10.0/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/github/.cargo/bin

    which node;
    which npm;

    node -v;
    npm -v;

    npm i -g pnpm@8;
    pnpm -v;

    pnpm m1;
    pnpm test;
"
