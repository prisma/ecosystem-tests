# syntax=docker/dockerfile:1

FROM node:lts-alpine3.17

WORKDIR /usr/src/app
COPY --from=app . ./
COPY --from=utils . ./

RUN apk update

# Only OpenSSL 3 is expected to be on this system
RUN if [ ! -e /lib/libssl.so.3 ]; then echo 'OpenSSL 3 not found in /lib/libssl.so.3'; exit 1; fi
RUN if [ -e /lib/libssl.so.1.1 ]; then echo 'OpenSSL 1.1 must not be installed (found in /lib/libssl.so.1.1)'; exit 1; fi

# expected target platform for Prisma, retrieved by `prisma -v`
ARG EXPECTED_PRISMA_TARGET_PLATFORM="linux-arm64-openssl-3.0.x"
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

# This will fail with:
# Error: Unable to require(`/usr/src/app/node_modules/@prisma/engines/libquery_engine-linux-arm64-openssl-3.0.x.so.node`)
#   Error loading shared library ld-linux-aarch64.so.1: No such file or directory (needed by /usr/src/app/node_modules/@prisma/engines/libquery_engine-linux-arm64-openssl-3.0.x.so.node)
RUN ./version.sh

RUN npx prisma generate

CMD node server.js
EXPOSE 3000
