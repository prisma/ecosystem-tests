#!/bin/sh

set -eu

yarn vercel logs e2e-vercel-node-builder.vercel.app --token=$VERCEL_TOKEN --scope=prisma
