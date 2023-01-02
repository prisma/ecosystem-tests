FROM node:lts-bullseye-slim

WORKDIR /usr/src/app
COPY --from=app . ./
COPY --from=utils . ./

# Update system dependencies
RUN apt-get update -y

# Only OpenSSL 1.1 is expected to be on this system
RUN ldconfig -p | grep ssl
RUN if [ ! -e /usr/lib/x86_64-linux-gnu/libssl.so.1.1* ]; then echo 'OpenSSL 1.1 not found in /usr/lib/x86_64-linux-gnu/libssl.so.1.1*'; exit 1; fi
RUN if [ -e /usr/lib/x86_64-linux-gnu/libssl.so.3* ]; then echo 'OpenSSL 3 must not be installed (found in /usr/lib/x86_64-linux-gnu/libssl.so.3*)'; exit 1; fi

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

CMD node server.js
EXPOSE 3000
