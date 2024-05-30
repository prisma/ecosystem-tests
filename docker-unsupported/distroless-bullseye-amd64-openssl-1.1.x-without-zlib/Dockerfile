# syntax=docker/dockerfile:1

# expected target architecture, retrieved by `uname -m`
ARG EXPECTED_UNAME_ARCH="x86_64"

# We have to use a Docker pipeline to install dependencies on Debian Bullseye
# and then copy them to a distroless image.

# Install dependencies on Debian Bullseye
FROM node:18-bullseye-slim as deps

WORKDIR /usr/src/app
COPY --from=app . ./
COPY --from=utils . ./

# Update system dependencies
RUN apt-get update -y

ARG EXPECTED_UNAME_ARCH
ENV EXPECTED_UNAME_ARCH=$EXPECTED_UNAME_ARCH
RUN ./uname.sh

# Only OpenSSL 1.1 is expected to be on this system
RUN ldconfig -p | grep ssl | sed "s/.*=>\s*//"
RUN if [ ! -e /usr/lib/${EXPECTED_UNAME_ARCH}-linux-gnu/libssl.so.1.1* ]; then echo "OpenSSL 1.1 not found in /usr/lib/${EXPECTED_UNAME_ARCH}-linux-gnu/libssl.so.1.1*"; exit 1; fi
RUN if [ -e /usr/lib/${EXPECTED_UNAME_ARCH}-linux-gnu/libssl.so.3* ]; then echo "OpenSSL 3 must not be installed (found in /usr/lib/${EXPECTED_UNAME_ARCH}-linux-gnu/libssl.so.3*)"; exit 1; fi

# expected target platform for Prisma, retrieved by `prisma -v`
ARG EXPECTED_PRISMA_TARGET_PLATFORM="debian-openssl-1.1.x"
ARG PRISMA_CLIENT_ENGINE_TYPE
ARG PRISMA_CLI_QUERY_ENGINE_TYPE
ARG CI
ARG DEBUG
ARG PRISMA_TELEMETRY_INFORMATION

ENV PRISMA_CLIENT_ENGINE_TYPE=$PRISMA_CLIENT_ENGINE_TYPE
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=$PRISMA_CLI_QUERY_ENGINE_TYPE
ENV CI=$CI
ENV DEBUG=$DEBUG
ENV PRISMA_TELEMETRY_INFORMATION=$PRISMA_TELEMETRY_INFORMATION
ENV EXPECTED_PRISMA_TARGET_PLATFORM=$EXPECTED_PRISMA_TARGET_PLATFORM

RUN yarn install
RUN ./version.sh
RUN npx prisma generate

# Move dependencies to the distroless image, which contains Node.js, a version of glibc compatible
# with the Node.js version installed and libssl, but no zlib.
FROM gcr.io/distroless/nodejs18-debian11:debug as runtime

WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/ ./

# This fails with:
# PrismaClientInitializationError: Unable to load Node-API Library from /usr/src/app/node_modules/.prisma/client/libquery_engine-debian-openssl-1.1.x.so.node, Library may be corrupt: libz.so.1: cannot open shared object file: No such file or directory
#     at DefaultLibraryLoader.loadLibrary (/usr/src/app/node_modules/@prisma/client/runtime/index.js:27280:17)
#     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
#     at async LibraryEngine.loadEngine (/usr/src/app/node_modules/@prisma/client/runtime/index.js:27586:24)
#     at async LibraryEngine.instantiateLibrary (/usr/src/app/node_modules/@prisma/client/runtime/index.js:27541:5) {
#   clientVersion: '4.10.0-dev.42',
#   errorCode: undefined
# }
CMD ["server.js"]
EXPOSE 3000
