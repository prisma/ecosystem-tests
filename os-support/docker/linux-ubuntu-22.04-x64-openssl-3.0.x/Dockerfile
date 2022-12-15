ARG UBUNTU_VERSION="22.04"

FROM ubuntu:${UBUNTU_VERSION} AS base

ARG NODE_VERSION="18.12.1"
ARG PNPM_VERSION="7.17.1"
ARG ARCH="x64"

ENV DATABASE_URL ""

WORKDIR /tmp

# Update system dependencies
RUN apt-get update -y \
  && apt-get install -y curl xz-utils

# Download Node.js binary for x64
RUN curl -fsSLO --compressed "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" \
  && tar -xJf "node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
  && rm "node-v${NODE_VERSION}-linux-${ARCH}.tar.xz"

RUN npm i -g pnpm@${PNPM_VERSION}

WORKDIR /app

# Install project dependencies
COPY package.json ./
RUN pnpm i

COPY . ./

RUN chmod +x ./init.sh
ENTRYPOINT [ "./init.sh" ]
