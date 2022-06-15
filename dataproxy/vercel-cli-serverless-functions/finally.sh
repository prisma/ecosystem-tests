#!/bin/sh

set -eu

yarn vercel logs https://e2e-dataproxy-vercel-cli.vercel.app --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID
