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
    OS_NAME=notset
    ;;
esac

echo "Using $OS_NAME"
if [ -z ${PRISMA_FORCE_NAPI+x} ]; then
  # binary
  echo "N-API Disabled"
  if [ $OS_NAME=='windows' ]; then
  QE_LOCATION="node_modules\@prisma\engines\query-engine-windows.exe"
  QE_LOCATION2="node_modules\prisma\node_modules\engines\query-engine-windows.exe"

  fi
  if [ $OS_NAME=='osx' ]; then
  QE_LOCATION="node_modules/@prisma/engines/query-engine-darwin"
  QE_LOCATION2="node_modules/prisma/node_modules/@prisma/engines/query-engine-darwin"

  fi
  if [ $OS_NAME=='linux' ]; then
  QE_LOCATION="node_modules/@prisma/engines/query-engine-debian-openssl-1.1.x"
  QE_LOCATION2="node_modules/prisma/node_modules/@prisma/engines/query-engine-debian-openssl-1.1.x"

  fi
else
  # library
  echo "N-API Enabled"
  if [ $OS_NAME=='windows' ]; then
  QE_LOCATION="node_modules\@prisma\engines\query_engine_napi-windows.dll.node"
  QE_LOCATION2="node_modules\prisma\node_modules\engines\query_engine_napi-windows.dll.node"

  fi
  if [ $OS_NAME=='osx' ]; then
  QE_LOCATION="node_modules/@prisma/engines/libquery_engine_napi-darwin.dylib.node"
  QE_LOCATION2="node_modules/prisma/node_modules/@prisma/engines/libquery_engine_napi-darwin.dylib.node"

  fi
  if [ $OS_NAME=='linux' ]; then
  QE_LOCATION="node_modules/@prisma/engines/libquery_engine_napi-debian-openssl-1.1.x.so.node"
  QE_LOCATION2="node_modules/prisma/node_modules/@prisma/engines/libquery_engine_napi-debian-openssl-1.1.x.so.node"

  fi
fi

echo "---"
yarn prisma -v
echo "--- ls node_modules/@prisma/engines/ ---"
ls node_modules/@prisma/engines/
echo "--- ls node_modules/.prisma/client/ ---"
ls node_modules/.prisma/client/
echo "--- ls node_modules/prisma/ ---"
ls node_modules/prisma/
echo "---"
if [ -f "$QE_LOCATION" ]  || [ -f "$QE_LOCATION2" ] ; then
  echo "Correct Query Engine exists"
else
  echo "Could not find Query Engine in ${QE_LOCATION} or ${QE_LOCATION2} when using ${OS_NAME}"
  exit 1
fi

