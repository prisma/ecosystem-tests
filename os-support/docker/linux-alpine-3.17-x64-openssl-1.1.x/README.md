# OS support: linux-alpine-3.17-x64-openssl-1.1.x

- Base Docker image: `alpine:3.17`
- OS: Linux Alpine 3.17
- Arch: x64
- OpenSSL location: `/lib/libssl.so.1.1`
- Query Engine name: `libquery_engine-linux-musl.so.node`

## Additional system librariees

- `openssl1.1-compat`

## Build & Run

```bash
./run.sh
```

## Expected errors

- No expected error, `./run.sh` should terminate with error code `0`.
