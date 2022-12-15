# OS support: linux-ubuntu-22.04-x64-openssl-3.0.x

- Base Docker image: `ubuntu:22.04`
- OS: Linux Ubuntu 22.04
- Arch: x64
- OpenSSL location: `/usr/lib/x86_64-linux-gnu/libssl.so.3`
- Query Engine name: `libquery_engine-debian-openssl-3.0.x.so.node`

## Build & Run

```bash
./run.sh
```

## Expected errors

- No expected error, `./run.sh` should terminate with error code `0`.
