# syntax=docker/dockerfile:1

FROM arm32v7/node:lts-slim

WORKDIR /usr/src/app
COPY --from=app . ./
COPY --from=utils . ./

# Update system dependencies
RUN apt-get update -y

# expected target architecture, retrieved by `uname -m`
ARG EXPECTED_UNAME_ARCH="armv7l"
ENV EXPECTED_UNAME_ARCH=$EXPECTED_UNAME_ARCH
RUN ./uname.sh

# Only OpenSSL 1.1 is expected to be on this system.
# A note about linux-gnueabihf:
# - the "eabihf" suffix is used for ARMv7 and ARMv8 (64-bit) architectures, where "eabi" means the code will run on bare metal arm,
#   and "hf" stands for "hard float". The compiler and its underlying libraries are using hardware floating point instructions
# rather than a software implementation of floating point such as fixed point software implementations.
RUN ldconfig -p | grep ssl | sed "s/.*=>\s*//"
RUN if [ ! -e /usr/lib/arm-linux-gnueabihf/libssl.so.1.1* ]; then echo "OpenSSL 1.1 not found in /usr/lib/arm-linux-gnueabihf/libssl.so.1.1*"; exit 1; fi
RUN if [ -e /usr/lib/arm-linux-gnueabihf/libssl.so.3* ]; then echo "OpenSSL 3 must not be installed (found in /usr/lib/arm-linux-gnueabihf/libssl.so.3*)"; exit 1; fi

# expected target platform for Prisma, retrieved by `prisma -v`
ARG EXPECTED_PRISMA_TARGET_PLATFORM="linux-arm-openssl-1.1.x"
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

RUN npm i -g pnpm@8
RUN pnpm install

# This will fail because we don't support linux-arm binaries:
# Error: Not Found https://binaries.prisma.sh/all_commits/df61b5f5ab3f27359e273f1cba4e5a9c7cb8485a/linux-arm-openssl-1.1.x/migration-engine.gz
# See:
# - https://github.com/prisma/prisma/issues/5379
# - https://github.com/prisma/engines-wrapper/pull/173
RUN ./version.sh

RUN pnpm prisma generate

CMD node server.js
EXPOSE 3000
