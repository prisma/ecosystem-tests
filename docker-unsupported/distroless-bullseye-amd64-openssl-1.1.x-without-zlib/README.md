# OS support: fail-distroless-bullseye-amd64-openssl-1.1.x-without-zlib

- Base Docker image: `gcr.io/distroless/nodejs18-debian11`
- OS: Linux Debian Bullseye, Distroless
- Arch: amd64 (x86_64)
- OpenSSL location: `/usr/lib/x86_64-linux-gnu/libssl.so.1.1`
- Binary target: `debian-openssl-1.1.x`

Distroless images are a set of minimal images containing only your application and its runtime dependencies. They do not contain package managers, shells or any other programs you would expect to find in a standard Linux distribution, which is great for the security of the system.

Distroless images do not have the `libz.so.1` library by default, which is required by Prisma.
This means the following error is raised at startup:

```sh
PrismaClientInitializationError: Unable to load Node-API Library from /usr/src/app/node_modules/.prisma/client/libquery_engine-debian-openssl-1.1.x.so.node, Library may be corrupt: libz.so.1: cannot open shared object file: No such file or directory
```
