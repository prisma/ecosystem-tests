# syntax=docker/dockerfile:1

FROM opensuse/tumbleweed:latest

ARG NODE_VERSION="18.12.1"
ARG ARCH="x64"

WORKDIR /usr/src/app
COPY --from=app . ./
COPY --from=utils . ./

# Install system dependencies for Node.js
RUN zypper refresh \
  && zypper --non-interactive dup \
  && zypper --non-interactive install curl tar

# Install Node.js
RUN curl -fsSLO --compressed "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" \
  && tar -xJf "node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
  && rm "node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" \
  && npm i -g pnpm

# Only OpenSSL 3 is expected to be on this system
RUN if [ ! -e /lib64/libssl.so.3 ]; then echo 'OpenSSL 3 not found in /lib64/libssl.so.3'; exit 1; fi
RUN if [ -e /lib64/libssl.so.1.1 ]; then echo 'OpenSSL 1.1 must not be installed (found in /lib64/libssl.so.1.1)'; exit 1; fi

# expected target platform for Prisma, retrieved by `prisma -v`
ARG EXPECTED_PRISMA_TARGET_PLATFORM="rhel-openssl-3.0.x"
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

RUN pnpm install
RUN ./version.sh
RUN npx prisma generate

CMD node server.js
EXPOSE 3000
