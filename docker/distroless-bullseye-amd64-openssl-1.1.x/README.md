# OS support: distroless-bullseye-amd64-openssl-1.1.x

- Base Docker image: `gcr.io/distroless/nodejs18-debian11:debug`
- OS: Linux Debian Bullseye, Distroless
- Arch: amd64 (x86_64)
- OpenSSL location: `/usr/lib/x86_64-linux-gnu/libssl.so.1.1`
- Binary target: `debian-openssl-1.1.x`

Distroless images are a set of minimal images containing only your application and its runtime dependencies. They do not contain package managers, shells or any other programs you would expect to find in a standard Linux distribution.
We had to copy the `libz.so.1` file from the `node:18-bullseye-slim` image (which uses the same Linux Debian version and arch as the distroless image) to the distroless image to make Prisma work.
