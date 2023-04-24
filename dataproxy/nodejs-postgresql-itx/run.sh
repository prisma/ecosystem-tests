#!/usr/bin/env bash

set -eu

pnpm install

ITX_PDP_POSTGRESQL=$ITX_PDP_POSTGRESQL_DATABASE_URL pnpm migrate-deploy
pnpm generate-client
