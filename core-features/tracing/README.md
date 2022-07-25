# Tracing

Tests that tracing works within another traced application.

Spins up a Fastify web server, performs a request against that server, and then asserts that thoes traces and Prisma traces are are nested correctly within each other.
