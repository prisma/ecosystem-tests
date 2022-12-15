# OS support: linux-node-alpine-3.17-x64-openssl-1.1.x

- Base Docker image: `node:18.12.1-alpine3.17`
- OS: Linux Alpine 3.17
- Arch: x64
- OpenSSL location: `/lib/libssl.so.1.1`
- Query Engine name: `libquery_engine-linux-musl.so.node`

## Additional system libraries

- `openssl1.1-compat`

## Build & Run

```bash
./run.sh
```
