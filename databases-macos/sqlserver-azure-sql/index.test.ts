import { afterAll, describe, expect, it } from 'vitest'
const { PrismaClient } = require('./generated/client')
const { PrismaMssql } = require('@prisma/adapter-mssql')

const prisma = new PrismaClient({
  adapter: new PrismaMssql(process.env.DATABASE_URL_DB_SQL_SERVER_AZURE_SQL),
})

describe('tests for mssql database', () => {
  afterAll(() => {
    prisma.$disconnect()
  })

  it('should query the database', async () => {
    const data = await prisma.user.findUnique({
      where: { email: 'alice@prisma.io' },
      select: { email: true, name: true },
    })
    expect(data).toMatchSnapshot()
  })
})
