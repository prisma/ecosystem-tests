#!/bin/sh

set -eux

echo "Node-API: Enabled"
ssh -i ./server-key.pem ec2-user@ec2-54-209-135-27.compute-1.amazonaws.com -tt "
  cd /home/ec2-user/aws-graviton/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE;
  pnpm test;
  "
