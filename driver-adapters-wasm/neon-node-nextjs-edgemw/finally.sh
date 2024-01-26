#!/usr/bin/env bash

cat deployment-url.txt
kill "$(cat server.pid)" || true
