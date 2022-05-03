#!/bin/sh

set -eu

yarn vercel logs e2e-vercel-node-builder.prisma.vercel.app --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID
