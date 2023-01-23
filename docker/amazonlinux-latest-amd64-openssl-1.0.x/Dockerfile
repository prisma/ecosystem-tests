# syntax=docker/dockerfile:1

# substitute for centos
FROM amazonlinux:latest

# Node.js 18 isn't compatible with Amazon Linux due to glibc version. It would throw with:
#   node: /lib64/libm.so.6: version `GLIBC_2.27' not found (required by node)
#   node: /lib64/libc.so.6: version `GLIBC_2.28' not found (required by node)
ARG NODE_VERSION="16.6.0"
ARG ARCH="x64"

WORKDIR /usr/src/app
COPY --from=app . ./
COPY --from=utils . ./

# Install system dependencies
RUN yum update -y \
  && yum install -y tar xz

# Install Node.js
RUN curl -fsSLO --compressed "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" \
  && tar -xJf "node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
  && rm "node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" \
  && npm i -g yarn

# Both OpenSSL 1.0 and OpenSSL 3.0 are expected to be on this system
RUN ldconfig -p | grep ssl | sed "s/.*=>\s*//"
RUN if [ ! -e /lib64/libssl.so.10 ]; then echo 'OpenSSL 1.0 not found in /lib64/libssl.so.10'; exit 1; fi
RUN if [ ! -e /lib64/libssl3.so ]; then echo 'OpenSSL 3 not found in /lib64/libssl.so.3'; exit 1; fi

# expected target platform for Prisma, retrieved by `prisma -v`
ARG EXPECTED_PRISMA_TARGET_PLATFORM="rhel-openssl-1.0.x"
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

CMD node server.js
EXPOSE 3000
