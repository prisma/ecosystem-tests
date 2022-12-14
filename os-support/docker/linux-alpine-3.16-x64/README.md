# OS support: linux-alpine-3.16-x64

- Docker image: `alpine:latest`
- OS: Linux Alpine 3.16
- Arch: x64

## Build & Run

```bash
./run.sh
```

## Expected errors

`pnpx prisma db push` will fail with the following error during the "generate" phase:

```text
Error: Unable to establish a connection to query-engine-node-api library. It seems there is a problem with your OpenSSL installation!
Details: Unable to require(`/root/.local/share/pnpm/store/v3/tmp/dlx-264/node_modules/.pnpm/prisma@4.7.1/node_modules/prisma/libquery_engine-linux-musl.so.node`)
Error loading shared library libssl.so.1.1: No such file or directory (needed by /root/.local/share/pnpm/store/v3/tmp/dlx-264/node_modules/.pnpm/prisma@4.7.1/node_modules/prisma/libquery_engine-linux-musl.so.node)
[Context: getDmmf]

Prisma CLI Version : 4.7.1
```
