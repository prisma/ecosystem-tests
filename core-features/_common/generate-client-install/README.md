# Client Install on Generate

Makes sure that `@prisma/client` is installed when it is not already present
when running `prisma generate && tsc`. This is done by not installing the Prisma Client
and then running `prisma generate && tsc`.

