FROM alpine:3.16 AS base

ARG NODE_VERSION="18.12.1"
ARG PNPM_VERSION="7.17.1"
ARG ARCH="x64"

ENV DATABASE_URL ""

WORKDIR /tmp

# Install OpenSSL 1.1 compatibility library
RUN apk update \
  && apk add openssl1.1-compat

# Install Node.js system dependencies
RUN apk upgrade && apk update && apk add --no-cache curl libstdc++

# Download Node.js binary for musl
RUN curl -fsSLO --compressed "https://unofficial-builds.nodejs.org/download/release/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${ARCH}-musl.tar.xz" \
  && tar -xJf "node-v$NODE_VERSION-linux-$ARCH-musl.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
  && rm "node-v$NODE_VERSION-linux-$ARCH-musl.tar.xz"

RUN npm i -g pnpm@${PNPM_VERSION}

WORKDIR /app

# Install project dependencies
COPY package.json ./
RUN pnpm i

COPY . ./

RUN chmod +x ./init.sh
ENTRYPOINT [ "./init.sh" ]
