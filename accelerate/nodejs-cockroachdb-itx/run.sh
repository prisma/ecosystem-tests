#!/usr/bin/env bash

set -eu

pnpm install

ITX_PDP_COCKROACHDB=$ITX_PDP_COCKROACHDB_DATABASE_URL pnpm migrate-deploy
pnpm generate-client
