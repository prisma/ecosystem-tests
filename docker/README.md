# Docker: OS Support

This folder builds and run Prisma on a series of different system configurations and architectures, described by `Dockerfile`s.

These systems are named following the convention
  
```
<MAYBE_FAIL><LINUX_DISTRO>-<VERSION>-<ARCHITECTURE>-openssl-<OPENSSL_VERSION>
```
  
where:
- `MAYBE_FAIL` is either `fail-` (when running the image would result in an error) or `` otherwise
- `LINUX_DISTRO` is the name of the Linux distribution (e.g. `ubuntu`, `debian`, `alpine`)
- `VERSION` is the version of the Linux distribution (e.g. `22.04`, `bullseye`, `latest`)
- `ARCHITECTURE` is the architecture of the Linux distribution (e.g. `amd64`, `arm64`)
- `OPENSSL_VERSION` is the main version of OpenSSL used by the system (e.g. `1.1.x`, `3.0.x`)

## Shared scripts

The `_utils` folder contains Bourne shell scripts that are shared across all dockerized systems via `Docker Buildx` build contexts.

- [`_utils/build.sh`](./_utils/build.sh) prints the Prisma version information (from `prisma -v`) and compares the actual "binaryTarget" platform with the expected one, which is defined via the `EXPECTED_PRISMA_TARGET_PLATFORM` build argument in the system Dockerfiles.
Failure to match the expected platform exactly will cause the build to fail with status code `2`. This allows Prisma developers to be alerted when updates to the systems' base Docker images cause the Prisma binary target platform to change unexpectedly.
- [`_utils/uname.sh`](./_utils/uname.sh) prints the system's architecture via `uname -m`, which is used to verify that the system's architecture is the expected one, which is defined via the `EXPECTED_UNAME_ARCH` build argument in the system Dockerfiles.
