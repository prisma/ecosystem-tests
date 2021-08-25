const { PrismaClient, Prisma } = require('@prisma/client')
const fs = require('fs')
const prisma = new PrismaClient()

const pjson = require('./package.json')

describe('tests for database', () => {
  afterAll(() => {
    prisma.$disconnect()
  })

  it('should test the Prisma version', async () => {
    expect(Prisma.prismaVersion.client).toEqual(
      pjson['dependencies']['@prisma/client'],
    )
  })

  it('should query the database', async () => {
    const data = await prisma.user.findMany()
    expect(data).toMatchSnapshot()
  })
})
