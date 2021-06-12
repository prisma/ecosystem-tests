#!/bin/sh

set -eux

yarn -s m1
yarn -s cmd

uname -a
arch -arm64e uname -a