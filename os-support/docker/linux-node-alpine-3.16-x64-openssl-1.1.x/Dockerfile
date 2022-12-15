ARG NODE_VERSION="18.12.1"
ARG ALPINE_VERSION="3.16"

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

ARG PNPM_VERSION="7.17.1"
ENV DATABASE_URL ""

RUN npm i -g pnpm@${PNPM_VERSION}

WORKDIR /app

COPY package.json ./
RUN pnpm i

COPY . ./

RUN chmod +x ./init.sh
ENTRYPOINT [ "./init.sh" ]
