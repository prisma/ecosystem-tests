#!/bin/sh

set -eux

# this just verifies environment variables are set
x="$SERVERLESS_LAMBDA_PG_URL"
x="$AWS_DEFAULT_REGION"
x="$AWS_ACCESS_KEY_ID"
x="$AWS_SECRET_ACCESS_KEY"
x="$AWS_ROLE"

yarn serverless config credentials --provider aws --key "$AWS_ACCESS_KEY_ID" --secret "$AWS_SECRET_ACCESS_KEY"
