#!/bin/sh

set -eu

yarn vercel logs vercel-node-builder.now.sh --token=$VERCEL_TOKEN --scope=prisma
