#!/bin/sh

set -eux

sh sync-to-remote.sh

if [ -z ${PRISMA_FORCE_NAPI+x} ]; then
  echo "N-API: Disabled"
  ssh -i ./server-key.pem ec2-user@54.72.209.131 -tt "
      cd /home/ec2-user/aws-graviton/$GITHUB_JOB/$GITHUB_RUN_ID;
      yarn;
      yarn prisma generate;
      yarn prisma -v;
  "
else
  echo "N-API: Enabled"
  ssh -i ./server-key.pem ec2-user@54.72.209.131 -tt "
      cd /home/ec2-user/aws-graviton/$GITHUB_JOB/$GITHUB_RUN_ID;
      export PRISMA_FORCE_NAPI=\"true\";
      yarn;
      yarn prisma generate;
      yarn prisma -v;
  "
fi


