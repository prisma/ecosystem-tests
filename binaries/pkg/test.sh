#!/bin/sh

set -eux
unset PRISMA_FORCE_NAPI
os=""
filename="./prisma"

case $OS in
"ubuntu-latest")
  os="linux"
  ;;
"macos-latest")
  os="macos"
  ;;
"windows-latest")
  os="win"
  filename="./prisma.exe"
  ;;
*)
  echo "no such os $OS"
  exit 1
  ;;
esac

yarn pkg node_modules/prisma -t node12-$os

./$filename --version
