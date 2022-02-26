# Client Install on Generate Sub Project

Variant of `generate-client-install` that makes sure that the client is
installed in the project where `yarn prisma generate` is called, even if a
`@prisma/client` has been found in a parent project folder.
