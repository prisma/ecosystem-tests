#!/bin/sh

set -eux

# We want to make sure this runs on M1, so we check the architecture
node m1.js

pnpm cmd
