#!/usr/bin/env bash

set -eu

pnpm install

ITX_PDP_MONGODB=$ITX_PDP_MONGODB_DATABASE_URL pnpm migrate-deploy
pnpm generate-client
