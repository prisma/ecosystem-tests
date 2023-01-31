# How to run Prisma on Docker

Prisma supports the most of the popular Docker images for Node.js out of the box.
However, due to the system dependencies the Prisma engines rely on and the complexities of providing compiled binaries for all operating systems and CPU architectures, some adjustments may be needed.

In this tutorial, we'll walk you through the process of setting up a Docker container for a Node.js application that uses Prisma. Given a simple Prisma schema, an empty Postgres database, and a basic Express.js server running on port `3000`, we'll create a Docker image that initialises Prisma, runs the server and connects to the database.

## Preliminaries

Create a new `prisma-docker-tutorial` directory, open it, and paste the following files in there:

```prisma
// ./prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgres"
  url      = env("DATABASE_URL")
}

model Author {
  id   Int      @id
  post Post[]
}

model Post {
  id     Int    @id
  user   Author @relation(fields: [userId], references: [id])
  userId Int
}
```

```js
// ./server.js
const express = require('express')
const app = express()
const port = 3000

const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

app.get('/', async (req, res) => {
  const data = await client.user.findMany()
  res.send(JSON.stringify(data))
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
```

```jsonc
// ./package.json
{
  "name": "@prisma/docker-tutorial",
  "license": "MIT",
  "devDependencies": {
    "prisma": "4.10.0"
  },
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "@prisma/client": "4.10.0",
    "express": "4.18.2"
  }
}
```

```yml
./docker-compose.yml
version: '3.7'

services:
  postgres:
    image: postgres:15
    hostname: postgres_db
    restart: always
    environment:
      - POSTGRES_DB=postgres
      - POSTGRES_USER=prisma
      - POSTGRES_PASSWORD=prisma
    ports:
      - '5432:5432'
    networks:
      - prisma-network

  prismacmd:
    image: prisma-docker-tutorial
    stdin_open: true
    environment:
      - DATABASE_URL=postgresql://prisma:prisma@postgres_db:5432/postgres
    depends_on:
      - postgres
    networks:
      - prisma-network

networks:
  prisma-network:
    name: prisma-network
```

This tutorial has been tested on Docker version `20.10.16`.

---

We define the `./Dockerfile` as follows:

## Linux Alpine (`node:alpine`)

This is the default Docker image for Node.js. It is based on Alpine Linux, which is a lightweight Linux distribution that uses the `musl` C standard library.
Prisma supports Alpine on `amd64` out of the box, and supports it on `arm64` since `prisma@4.10.0`.

Related Docker images:
- `node:lts-alpine`
- `node:16-alpine`
- `node:14-alpine`

```Dockerfile
# syntax=docker/dockerfile:1
FROM node:lts-alpine3.17

WORKDIR /usr/src/app
COPY --from=app . ./

RUN npm i \
  && npx prisma generate

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
```

**Note**: when running on Linux Alpine, Prisma downloads engines that are compiled for the `musl` C standard library. Please don't install `glibc` on Alpine (e.g., via the `libc6-compat` package), as that would prevent Prisma from running successfully.

---

## Linux Debian (`node:slim`)

This image is based on Linux Debian, and uses the `glibc` C standard library.
It is mostly supported out of the box on `amd64` and `arm64`, but as some older versions of this image come without `libssl` installed, it is sometimes necessary to install it manually.

Related Docker images:
- `node:lts-slim`
- `node:bullseye-slim`
- `node:buster-slim`
- `node:stretch-slim`

```Dockerfile
# syntax=docker/dockerfile:1
FROM node:slim

# Note: uncomment the following block if you're using an image based on Debian Buster, which doesn't come with libssl pre-installed
RUN apt-get update -y \
  && apt-get install -y openssl

WORKDIR /usr/src/app
COPY --from=app . ./

RUN npm install \
  && npx prisma generate

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
```

---

## Distroless (`gcr.io/distroless/nodejs18-debian11`)

Distroless images are a set of minimal images containing only your application and its runtime dependencies. They do not contain package managers, shells or any other programs you would expect to find in a standard Linux distribution, which is great for the security of the system.

Although this image is originally based on Linux Debian Bullseye, some manual care is required before it can be used with Prisma. In particular, commands like `npm install` and `prisma generate` must be run in a separate build stage, as the distroless image doesn't come with `npm` or a shell pre-installed. Moreover, the `zlib` system dependency is missing, and must be copied from a compatible Debian image manually.

On Distroless, only the `amd64` architecture is supported.

```Dockerfile
# syntax=docker/dockerfile:1

# Build stage on Debian 11
FROM node:18-bullseye-slim as deps

WORKDIR /usr/src/app
COPY --from=app . ./

# Uncomment the following block if you're using an image based on Debian Buster, which doesn't come with libssl pre-installed
RUN apt-get update -y \
  && apt-get install -y openssl

WORKDIR /usr/src/app
COPY . ./

RUN npm i \
  && npx prisma generate

# Runtime stage on Distroless
FROM gcr.io/distroless/nodejs18-debian11 as runtime

WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/ ./

# Copy zlib from Debian, which is needed by Prisma
COPY --from=deps /lib/x86_64-linux-gnu/libz.so.1 /lib/x86_64-linux-gnu/libz.so.1

# the distroless' image entrypoint is /nodejs/bin/node
CMD ["server.js"]
EXPOSE 3000
```

---

## Other Linux Distros

Prisma supports other recent Linux distributions, like Red Hat and Arch Linux, but sometimes you may need to install some system dependencies manually.

Non-exhaustive examples of other Docker images supported out of the box are:
- `registry.access.redhat.com/ubi9/nodejs-18` (on `amd64`)
- `ubuntu:20.04` and superior versions (on `amd64` and `arm64`, requires manual Node.js installation)
- `public.ecr.aws/amazonlinux/amazonlinux:2022` (on `amd64` and `arm64`, requires manual Node.js installation)
- `archlinux` (on `amd64`, requires manual Node.js installation)
- `opensuse/tumbleweed` (on `amd64`, requires manual Node.js installation)
