#!/bin/sh

set -eux

lsof -ti tcp:4000 | xargs kill