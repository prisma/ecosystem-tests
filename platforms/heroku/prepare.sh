#!/bin/sh

# See README and https://github.com/prisma/prisma/issues/24199
# Since we use a custom output, we disabled the engine check.
# it fails with the error below, which is expected with a custom output.
#
# Error: Cannot find module '.prisma/client/package.json'
# Require stack:
# - /home/runner/work/ecosystem-tests/ecosystem-tests/platforms/heroku/[eval]
#     at Function.Module._resolveFilename (node:internal/modules/cjs/loader:1028:15)
#     at Function.resolve (node:internal/modules/cjs/helpers:125:19)
#     at [eval]:3:26
#     at Script.runInThisContext (node:vm:129:12)
#     at Object.runInThisContext (node:vm:313:38)
#     at node:internal/process/execution:79:19
#     at [eval]-wrapper:6:22
#     at evalScript (node:internal/process/execution:78:60)
#     at node:internal/main/eval_string:27:3 {
#   code: 'MODULE_NOT_FOUND',
#   requireStack: [
#     '/home/runner/work/ecosystem-tests/ecosystem-tests/platforms/heroku/[eval]'
#   ]
# }

SKIP_ENGINE_CHECK=1
