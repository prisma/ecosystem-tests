# OS support: linux-alpine-3.17-x64-openssl-3.0.x

- Base Docker image: `alpine:3.17`
- OS: Linux Alpine 3.17
- Arch: x64
- OpenSSL location: `/lib/libssl.so.3`
- Query Engine name: `libquery_engine-linux-musl.so.node`

## Build & Run

```bash
./run.sh
```

## Expected errors

- `prisma -v` will fail retrieving the version of the Query Engine (Node-API):

  ```text
  Error: Unable to require(`/root/.local/share/pnpm/store/v3/tmp/dlx-23/node_modules/.pnpm/@prisma+engines@4.7.1/node_modules/@prisma/engines/libquery_engine-linux-musl.so.node`)
  Error loading shared library libssl.so.1.1: No such file or directory (needed by /root/.local/share/pnpm/store/v3/tmp/dlx-23/node_modules/.pnpm/@prisma+engines@4.7.1/node_modules/@prisma/engines/libquery_engine-linux-musl.so.node)
       at load (/root/.local/share/pnpm/store/v3/tmp/dlx-23/node_modules/.pnpm/prisma@4.7.1/node_modules/prisma/build/index.js:89202:11)
       at getEngineVersion (/root/.local/share/pnpm/store/v3/tmp/dlx-23/node_modules/.pnpm/prisma@4.7.1/node_modules/prisma/build/index.js:90000:16)
  ...
  Query Engine (Node-API) : E_CANNOT_RESOLVE_VERSION (at ../root/.local/share/pnpm/store/v3/tmp/dlx-23/node_modules/.pnpm/@prisma+engines@4.7.1/node_modules/@prisma/engines/libquery_engine-linux-musl.so.node)
  ```

- `prisma db push` will fail with the following error during the "generate" phase:

  ```text
  Error: Unable to establish a connection to query-engine-node-api library. It seems there is a problem with your OpenSSL installation!
  Details: Unable to require(`/root/.local/share/pnpm/store/v3/tmp/dlx-23/node_modules/.pnpm/prisma@4.7.1/node_modules/prisma/libquery_engine-linux-musl.so.node`)
  Error loading shared library libssl.so.1.1: No such file or directory (needed by /root/.local/share/pnpm/store/v3/tmp/dlx-23/node_modules/.pnpm/prisma@4.7.1/node_modules/prisma/libquery_engine-linux-musl.so.node)
  [Context: getDmmf]

  Prisma CLI Version : 4.7.1
  ```
