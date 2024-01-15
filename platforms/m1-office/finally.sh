#!/bin/sh

set -eux

MACHINE_IP=192.168.1.192

sshpass -p$MACHINE_SECRET ssh -tt github@$MACHINE_IP "rm -rf /Users/github/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE"

