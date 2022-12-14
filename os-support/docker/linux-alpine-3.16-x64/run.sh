#!/bin/sh

set -eux

# build "prisma-linux-alpine-x64" docker image
docker buildx build --load -f Dockerfile --platform=linux/amd64 . -t prisma-linux-alpine-x64 --progress plain;

docker-compose -f docker-compose.yml up --abort-on-container-exit;
