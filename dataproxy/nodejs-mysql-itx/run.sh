#!/usr/bin/env bash

set -eu

pnpm install

ITX_PDP_MYSQL=$ITX_PDP_MYSQL_DATABASE_URL pnpm migrate-deploy
pnpm generate-client
