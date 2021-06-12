#!/bin/sh

set -eux

sh sync-to-remote.sh

if [ -z ${PRISMA_FORCE_NAPI+x} ]; then
  echo "N-API: Disabled"
  ssh -i ./server-key.pem administrator@207.254.29.83 -tt "
      cd /Users/administrator/e2e-tests;
      yarn;
      yarn prisma generate;
  "
else
  echo "N-API: Enabled"
  ssh -i ./server-key.pem administrator@207.254.29.83 -tt "
      cd /Users/administrator/e2e-tests;
      export PRISMA_FORCE_NAPI=\"true\";
      yarn;
      yarn prisma generate;
  "
fi
