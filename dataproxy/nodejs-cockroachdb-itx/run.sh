#!/usr/bin/env bash

set -eu

yarn install

ITX_PDP_COCKROACHDB=$ITX_PDP_COCKROACHDB_DATABASE_URL yarn migrate-deploy
yarn generate-client
