#!/bin/sh

set -eu

pnpm vercel logs https://e2e-dataproxy-vercel-cli.vercel.app --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID
