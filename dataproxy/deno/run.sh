#!/usr/bin/env bash

set -eu

deno run -A --unstable npm:prisma@4.5.0-integration-feat-deno-deploy.3 generate --data-proxy

# manipulate generated client so Data Proxy does not stumble over new preview feature flag
node manipulate.js