# pkg

This test tests bundling Prisma CLI code with [`pkg`](https://github.com/vercel/pkg).

## How to run this locally

### Environment variables

Set the env var `OS` to `ubuntu-20.04`, `macos-latest`, `windows-latest` to instruct `pkg` to generate a binary for a specific OS. Note that `test.sh` then should be run on the target OS to test the binary correctly.
