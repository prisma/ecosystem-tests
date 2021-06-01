echo "=== Checking for CLI QE Binary ==="

echo "Using $OS"

if [ -z ${PRISMA_FORCE_NAPI+x} ]; then
  # binary
  echo "N-API Disabled"
  case $OS in
    "ubuntu-latest")
      QE_LOCATION="node_modules/@prisma/engines/query-engine-debian-openssl-1.1.x"
      QE_LOCATION2="node_modules/prisma/node_modules/@prisma/engines/query-engine-debian-openssl-1.1.x"
      ;;
    "macos-latest")
      QE_LOCATION="node_modules/@prisma/engines/query-engine-darwin"
      QE_LOCATION2="node_modules/prisma/node_modules/@prisma/engines/query-engine-darwin"
      ;;
    "windows-latest")
      QE_LOCATION="node_modules\@prisma\engines\query-engine-windows.exe"
      QE_LOCATION2="node_modules\prisma\node_modules\engines\query-engine-windows.exe"
      ;;
  esac
else
  # library

  echo "N-API Enabled"
  case $OS in
    "ubuntu-latest")
      QE_LOCATION="node_modules/@prisma/engines/libquery_engine_napi-debian-openssl-1.1.x.so.node"
      QE_LOCATION2="node_modules/prisma/node_modules/@prisma/engines/libquery_engine_napi-debian-openssl-1.1.x.so.node"
      ;;
    "macos-latest")
      QE_LOCATION="node_modules/@prisma/engines/libquery_engine_napi-darwin.dylib.node"
      QE_LOCATION2="node_modules/prisma/node_modules/@prisma/engines/libquery_engine_napi-darwin.dylib.node"
      ;;
    "windows-latest")
      QE_LOCATION="node_modules\@prisma\engines\query_engine_napi-windows.dll.node"
      QE_LOCATION2="node_modules\prisma\node_modules\engines\query_engine_napi-windows.dll.node"
      ;;
  esac
fi

echo "---"
yarn prisma -v
echo "--- ls node_modules/@prisma/engines/ ---"
ls node_modules/@prisma/engines/
echo "--- ls node_modules/prisma/ ---"
ls node_modules/prisma/
echo "---"
if [ -f "$QE_LOCATION" ]  || [ -f "$QE_LOCATION2" ] ; then
  echo "Correct Query Engine exists"
else
  echo "Could not find Query Engine in ${QE_LOCATION} or ${QE_LOCATION2} when using ${OS}"
  exit 1
fi

