#!/bin/sh

set -eu

yarn vercel logs e2e-vercel-with-redwood.vercel.app --token=$VERCEL_TOKEN --scope=prisma
