#!/bin/sh

set -eux

sh sync-to-remote.sh

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  echo "Node-API: Disabled"
  ssh -i ./server-key.pem ec2-user@ec2-54-209-135-27.compute-1.amazonaws.com -tt "
      cd /home/ec2-user/aws-graviton/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE;
      export PRISMA_CLIENT_ENGINE_TYPE=\"binary\"
      rm -rf ./node_modules;
      npm i -g pnpm@8;
      pnpm install --reporter=append-only;
      pnpm prisma generate;
      pnpm prisma -v;
  "
else
  echo "Node-API: Enabled"
  ssh -i ./server-key.pem ec2-user@ec2-54-209-135-27.compute-1.amazonaws.com -tt "
      cd /home/ec2-user/aws-graviton/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE;
      export PRISMA_CLIENT_ENGINE_TYPE=\"library\"
      rm -rf ./node_modules;
      npm i -g pnpm@8;
      pnpm install --reporter=append-only;
      pnpm prisma generate;
      pnpm prisma -v;
  "
fi


