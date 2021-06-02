case $(uname | tr '[:upper:]' '[:lower:]') in
  linux*)
    OS_NAME=linux
    ;;
  darwin*)
    OS_NAME=osx
    ;;
  msys*)
    OS_NAME=windows
    ;;
  *)
    OS_NAME=windows
    ;;
esac
echo "Using $OS_NAME"

if [ -z ${PRISMA_FORCE_NAPI+x} ]; then
  # binary
  echo "N-API Disabled"
  case $OS_NAME in
    linux)
      QE_LOCATION="node_modules/.prisma/client/query-engine-debian-openssl-1.1.x"
      ;;
    osx)
      QE_LOCATION="node_modules/.prisma/client/query-engine-darwin"
      ;;
    windows)
      QE_LOCATION="node_modules\.prisma\client\query-engine-windows.exe"
      ;;
    *)
      OS_NAME=notset
      ;;
  esac
else
  # library

  echo "N-API Enabled"
  case $OS_NAME in
    linux)
      echo "Linux"
      QE_LOCATION="node_modules/.prisma/client/libquery_engine_napi-debian-openssl-1.1.x.so.node"
      ;;
    osx)
      echo "Osx"
      QE_LOCATION="node_modules/.prisma/client/libquery_engine_napi-darwin.dylib.node"
      ;;
    windows*)
      echo "Windows"
      QE_LOCATION="node_modules\.prisma\client\query_engine_napi-windows.dll.node"
      ;;
    *)
      OS_NAME=notset
      ;;
  esac
fi

echo "--- ls node_modules/.prisma/client/ ---"
ls node_modules/.prisma/client/
echo "---"
if [ -f "$QE_LOCATION" ] ; then
  echo "Correct Query Engine exists"
else
  echo "Could not find Query Engine in ${QE_LOCATION} when using ${OS_NAME}"
  exit 1
fi

