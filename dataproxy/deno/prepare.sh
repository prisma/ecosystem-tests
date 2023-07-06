#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests dataproxy deno build'

# Install Deno CLI (not needed on GH Actions, only here for reference for local testing)
# curl -fsSL https://deno.land/x/install/install.sh | sh
# alias deno='/home/gitpod/.deno/bin/deno'