#!/bin/sh

set -eux

ssh -tt -i ./server-key.pem ec2-user@ec2-54-209-135-27.compute-1.amazonaws.com "
    rm -rf /home/ec2-user/aws-graviton/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE
    # delete parent folder if empty
    find /home/ec2-user/aws-graviton/$GITHUB_JOB/$GITHUB_RUN_ID -maxdepth 0 -empty -delete
    pnpm store prune
"


