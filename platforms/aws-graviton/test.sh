#!/bin/sh

set -eu

if [ -z ${PRISMA_FORCE_NAPI+x} ]; then
  echo "Node-API: Disabled"
  ssh -i ./server-key.pem ec2-user@54.72.209.131 -tt "
    cd /home/ec2-user/aws-graviton/$GITHUB_JOB/$GITHUB_RUN_ID; 
    yarn test;
    "
else
  echo "Node-API: Enabled"
  ssh -i ./server-key.pem ec2-user@54.72.209.131 -tt "
    cd /home/ec2-user/aws-graviton/$GITHUB_JOB/$GITHUB_RUN_ID;
    export PRISMA_FORCE_NAPI=\"true\";
    yarn test;
    "
fi
