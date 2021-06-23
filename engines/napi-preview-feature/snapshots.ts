export const Snapshots: Record<string, Record<string, string>> = {
  Linux: { 
    'engine-binary': `Array [
  "README.md",
  "dist",
  "download",
  "introspection-engine-debian-openssl-1.1.x",
  "migration-engine-debian-openssl-1.1.x",
  "package.json",
  "prisma-fmt-debian-openssl-1.1.x",
  "query-engine-debian-openssl-1.1.x",
]`,

    'prisma-binary': `Array [
  "README.md",
  "build",
  "install",
  "package.json",
  "preinstall",
  "prisma-client",
  "query-engine-debian-openssl-1.1.x",
  "scripts",
]`,

      'version-binary': `"prisma                : placeholder 
@prisma/client        : placeholder 
Current platform      : placeholder 
Query Engine          : placeholder (at node_modules/@prisma/engines/query-engine-debian-openssl-1.1.x)
Migration Engine      : placeholder (at node_modules/@prisma/engines/migration-engine-debian-openssl-1.1.x)
Introspection Engine  : placeholder (at node_modules/@prisma/engines/introspection-engine-debian-openssl-1.1.x)
Format Binary         : placeholder (at node_modules/@prisma/engines/prisma-fmt-debian-openssl-1.1.x)
Default Engines Hash  : placeholder 
Studio                : placeholder "`,

      'client-binary': `Array [
  "index-browser.js",
  "index.d.ts",
  "index.js",
  "package.json",
  "query-engine-debian-openssl-1.1.x",
  "schema.prisma",
  ]`
  },
  Windows_NT: {},
  Darwin: {}

}