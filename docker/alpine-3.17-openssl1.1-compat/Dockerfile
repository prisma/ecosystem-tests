FROM node:lts-alpine3.17

COPY . /usr/src/app/
WORKDIR /usr/src/app

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

RUN apk update && apk add openssl1.1-compat

# Both OpenSSL 1.1 and OpenSSL 3 must be present after installing openssl1.1-compat
RUN if [ ! -e /lib/libssl.so.1.1 ]; then echo 'OpenSSL 1.1 not found in /lib/libssl.so.1.1'; exit 1; fi
RUN if [ ! -e /lib/libssl.so.3 ]; then echo 'OpenSSL 3 not found in /lib/libssl.so.3'; exit 1; fi

RUN yarn install
RUN npx prisma generate
RUN npx prisma -v

CMD node server.js
EXPOSE 3000
