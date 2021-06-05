#!/bin/sh

set -eu

sh sync-to-remote.sh

if [ -z ${PRISMA_FORCE_NAPI+x} ]; then
  echo "N-API:  Disabled"
  ssh -i ./server-key.pem ec2-user@54.72.209.131 -tt "
      cd /home/ec2-user/aws-graviton/;
      yarn;
      yarn prisma generate;
  "
else
  echo "N-API: Enabled"
  ssh -i ./server-key.pem ec2-user@54.72.209.131 -tt "
      cd /home/ec2-user/aws-graviton/;
      export PRISMA_FORCE_NAPI=\"true\";
      yarn;
      yarn prisma generate;
  "
fi


