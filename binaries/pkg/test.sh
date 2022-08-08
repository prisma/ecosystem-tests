#!/bin/sh

set -eux

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

yarn pkg node_modules/prisma -t node14-$os
$filename --version
rm $filename

yarn pkg node_modules/prisma -t node16-$os
$filename --version
rm $filename


# Shows the following error but seems to work in the end anyway:
# 
# /workspaces/ecosystem-tests/binaries/pkg/node_modules/node-abi/index.js:36
#   throw new Error('Could not detect abi for version ' + target + ' and runtime ' + runtime + '.  Updating "node-abi" might help solve this issue if it is a new release of ' + runtime)
#   ^
# Error: Could not detect abi for version 18.1.0 and runtime node.  Updating "node-abi" might help solve this issue if it is a new release of node
#     at getAbi (/workspaces/ecosystem-tests/binaries/pkg/node_modules/node-abi/index.js:36:9)
#     at module.exports (/workspaces/ecosystem-tests/binaries/pkg/node_modules/prebuild-install/rc.js:52:57)
#     at Object.<anonymous> (/workspaces/ecosystem-tests/binaries/pkg/node_modules/prebuild-install/bin.js:8:25)
#     at Module._compile (internal/modules/cjs/loader.js:1085:14)
#     at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
#     at Module.load (internal/modules/cjs/loader.js:950:32)
#     at Function.Module._load (internal/modules/cjs/loader.js:790:12)
#     at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:75:12)
#     at internal/main/run_main_module.js:17:47
# 
# Node.js 18
yarn pkg node_modules/prisma -t latest-$os
$filename --version
rm $filename
