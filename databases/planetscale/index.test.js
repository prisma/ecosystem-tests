const { PrismaClient, Prisma } = require('./generated/client')
const { PrismaPlanetScale } = require('@prisma/adapter-planetscale')

const prisma = new PrismaClient({
  adapter: new PrismaPlanetScale({ url: process.env.DATABASE_URL_PLANETSCALE }),
})

const pjson = require('./package.json')

describe('tests for database', () => {
  afterAll(() => {
    prisma.$disconnect()
  })

  it('should test the Prisma version', async () => {
    expect(Prisma.prismaVersion.client).toEqual(pjson['dependencies']['@prisma/client'])
  })

  it('should query the database', async () => {
    const data = await prisma.user.findMany()
    expect(data).toMatchSnapshot()
  })
})
