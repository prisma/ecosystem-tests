#!/bin/sh

set -eux

# Debugging
traceroute region.turso.io

pnpm test
