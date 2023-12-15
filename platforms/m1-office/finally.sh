#!/bin/sh

set -eux

MACHINE_IP=207.254.29.83

ssh -tt -i ./server-key.pem administrator@$MACHINE_IP "rm -rf /Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE"

