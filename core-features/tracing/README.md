# Tracing

Tests that tracing works within another traced application.

Spins up a fastify web server, performs a request against that server, and then asserts that those traces and Prisma traces are nested correctly within each other.
