#!/bin/sh

pnpm install
pnpm prisma generate
pnpm tsc
