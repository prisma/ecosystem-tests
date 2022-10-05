#!/usr/bin/env bash

set -eu

DENO_NODE_COMPAT_URL=https://raw.githubusercontent.com/denoland/deno_std/b458898c5299ebdef447ea5548452a49710538c0/ PRISMA_CLI_QUERY_ENGINE_TYPE=binary deno run -A --unstable npm:prisma@4.4.0-integration-feat-deno-deploy.1 generate --data-proxy
