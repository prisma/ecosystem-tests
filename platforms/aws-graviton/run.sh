#!/bin/sh

set -eux

ssh -tt -i ./server-key.pem ec2-user@ec2-54-209-135-27.compute-1.amazonaws.com "find /home/ec2-user/aws-graviton/$GITHUB_JOB -mtime +0 -exec rm -rf {} \;"
sh sync-to-remote.sh

echo "PRISMA_CLIENT_ENGINE_TYPE = $PRISMA_CLIENT_ENGINE_TYPE"

ssh -i ./server-key.pem ec2-user@ec2-54-209-135-27.compute-1.amazonaws.com -tt "
    cd /home/ec2-user/aws-graviton/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE;

    export CI=\"true\"
    export PRISMA_CLIENT_ENGINE_TYPE=\"$PRISMA_CLIENT_ENGINE_TYPE\"

    rm -rf ./node_modules;

    npm i -g pnpm@8;
    pnpm -v;

    pnpm install;
    pnpm prisma generate;
    pnpm prisma -v;
"
