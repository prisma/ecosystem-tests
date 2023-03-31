#!/bin/sh

set -eux

ssh -i ./server-key.pem administrator@207.254.29.83 -tt "
    cd /Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE;

    echo $PATH

    # to get around https://serverfault.com/questions/351731/why-does-the-path-of-an-ssh-remote-command-differ-from-that-of-an-interactive-s
    export PATH=/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/administrator/.cargo/bin:/Users/administrator/.npm-global/bin

    pnpm m1;
    pnpm test;
"
