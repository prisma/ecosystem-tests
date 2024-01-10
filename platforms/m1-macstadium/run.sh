#!/bin/sh

set -eux

export MACHINE_IP=207.254.29.83

sh sync-to-remote.sh

echo "PRISMA_CLIENT_ENGINE_TYPE = $PRISMA_CLIENT_ENGINE_TYPE"

ssh -i ./server-key.pem administrator@$MACHINE_IP -tt "
    cd /Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE;
    export PRISMA_CLIENT_ENGINE_TYPE=\"$PRISMA_CLIENT_ENGINE_TYPE\";
    export CI=\"true\";

    # to get around https://serverfault.com/questions/351731/why-does-the-path-of-an-ssh-remote-command-differ-from-that-of-an-interactive-s
    export PATH=/Users/administrator/.nvm/versions/node/v16.20.1/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/administrator/.cargo/bin

    npm i -g pnpm@8;
    pnpm -v;

    pnpm install;
    pnpm prisma generate;
    pnpm prisma -v;
"
