#!/bin/sh

set -eux

MACHINE_IP=207.254.29.83

ssh -i ./server-key.pem administrator@$MACHINE_IP -tt "
    cd /Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE;

    # to get around https://serverfault.com/questions/351731/why-does-the-path-of-an-ssh-remote-command-differ-from-that-of-an-interactive-s
    export PATH=/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/administrator/.cargo/bin

    npm i -g pnpm@8;
    pnpm m1;
    pnpm test;
"
