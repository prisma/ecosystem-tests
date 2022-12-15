# OS support: linux-alpine-3.16-x64-openssl-1.1.x

- Base Docker image: `alpine:3.16`
- OS: Linux Alpine 3.16
- Arch: x64
- OpenSSL location: `/lib/libssl.so.1.1`
- Query Engine name: `libquery_engine-linux-musl.so.node`

## Build & Run

```bash
./run.sh
```

## Expected errors

- No expected error, `./run.sh` should terminate with error code `0`.
