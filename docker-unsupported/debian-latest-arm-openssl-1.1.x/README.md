# OS support: fail-debian-latest-arm-openssl-1.1.x

- Base Docker image: `arm32v7/node:lts-slim`
- OS: Linux Debian (latest)
- Arch: arm (armv7l)
- OpenSSL location: `/usr/lib/arm-linux-gnueabihf/libssl.so.1.1`
- Binary target: `linux-arm-openssl-1.1.x`

Prisma doesn't support 32bit ARM architectures yet.
See: https://github.com/prisma/prisma/issues/5379
