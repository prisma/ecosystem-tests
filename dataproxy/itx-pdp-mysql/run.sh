#!/usr/bin/env bash

set -eu

yarn install

ITX_PDP_MYSQL=$ITX_PDP_MYSQL_DATABASE_URL yarn migrate-deploy
yarn generate-client
