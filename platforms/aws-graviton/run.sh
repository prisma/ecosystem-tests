#!/bin/sh

set -eu

sh sync-to-remote.sh

ssh -i ./server-key.pem ec2-user@54.72.209.131 -tt "
    cd /home/ec2-user/aws-graviton/; 
    yarn;
    yarn prisma generate;
"
