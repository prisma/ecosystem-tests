#!/bin/sh

set -eux

ssh -tt -i ./server-key.pem ec2-user@54.72.209.131 "rm -rf /home/ec2-user/aws-graviton/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE"

