#!/bin/sh

set -eux

os=""
filename="./prisma"

case $OS in
"ubuntu-20.04")
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

yarn pkg node_modules/prisma -t node14-$os

./$filename --version
