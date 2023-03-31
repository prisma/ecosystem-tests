#!/bin/sh

set -eux

sh sync-to-remote.sh

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  echo "N-API: Disabled"
  ssh -i ./server-key.pem administrator@207.254.29.83 -tt "
      cd /Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE;
      export PRISMA_CLIENT_ENGINE_TYPE=\"binary\";

      npm i -g pnpm@7;
      pnpm install;
      pnpm prisma generate;
      pnpm prisma -v;
  "
else
  echo "N-API: Enabled"
  ssh -i ./server-key.pem administrator@207.254.29.83 -tt "
      cd /Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE;
      export PRISMA_CLIENT_ENGINE_TYPE=\"library\";

      npm i -g pnpm@7;
      pnpm install;
      pnpm prisma generate;
      pnpm prisma -v;
  "
fi
