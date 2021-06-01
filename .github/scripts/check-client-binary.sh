echo "=== Checking for Generated Client Binary ==="


echo "Using $OS"

if [ -z ${PRISMA_FORCE_NAPI+x} ]; then
  # binary
  echo "N-API Disabled"
  case $OS in
    "ubuntu-latest")
      QE_LOCATION="node_modules/.prisma/client/query-engine-debian-openssl-1.1.x"
      ;;
    "macos-latest")
      QE_LOCATION="node_modules/.prisma/client/query-engine-darwin"
      ;;
    "windows-latest")
      QE_LOCATION="node_modules\.prisma\client\query-engine-windows.exe"
      ;;
  esac
else
  # library

  echo "N-API Enabled"
  case $OS in
    "ubuntu-latest")
      QE_LOCATION="node_modules/.prisma/client/libquery_engine_napi-debian-openssl-1.1.x.so.node"
      ;;
    "macos-latest")
      QE_LOCATION="node_modules/.prisma/client/libquery_engine_napi-darwin.dylib.node"
      ;;
    "windows-latest")
      QE_LOCATION="node_modules\.prisma\client\query_engine_napi-windows.dll.node"
      ;;
  esac
fi

echo "---"
yarn prisma -v

echo "--- ls node_modules/.prisma/client/ ---"
ls node_modules/.prisma/client/

if [ -f "$QE_LOCATION" ]; then
  echo "Correct Query Engine exists"
else
  echo "Could not find Query Engine in ${QE_LOCATION} when using ${OS}"
  exit 1
fi

