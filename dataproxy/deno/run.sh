#!/usr/bin/env bash

set -eu

deno run -A --unstable npm:prisma@4.4.0-integration-feat-deno-deploy.1 generate --data-proxy
