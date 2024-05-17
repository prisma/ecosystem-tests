#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests runtimes bun build'

# Install Bun (not needed on GH Actions, only here for reference for local testing)
# curl -fsSL https://bun.sh/install | bash
# source /home/gitpod/.bashrc

bun -v