import { describe, expect, it, test } from 'vitest'
const { PrismaClient } = require('./dist/prismaTest')
const { PrismaPg } = require('@prisma/adapter-pg')

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
})

describe('Using browser custom output', () => {
  test('prisma.user.findFirst() should fail', async () => {
    expect.assertions(1)

    try {
      prisma.user.findFirst()
    } catch (e) {
      expect(e.message).toContain('PrismaClient is unable to run in')
    }
  })

  test('prisma.queryRaw`...` should fail', async () => {
    expect.assertions(1)

    try {
      prisma.$queryRaw`SELECT 1`
    } catch (e) {
      expect(e.message).toContain('PrismaClient is unable to run in')
    }
  })

  test('When using a client extension it should fail', async () => {
    expect.assertions(1)

    try {
      prisma.$extends({})
    } catch (e) {
      expect(e.message).toContain('PrismaClient is unable to run in')
    }
  })
})
