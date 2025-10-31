const { PrismaClient, Prisma } = require('@prisma/client')
const { PrismaMariaDb } = require('@prisma/adapter-mariadb')

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.GCP_MYSQL_SSL_DB_URL),
})

const pjson = require('./package.json')

describe('tests for GCP MySQL SSL database', () => {
  afterAll(() => {
    prisma.$disconnect()
  })

  it('should test the Prisma version', async () => {
    expect(Prisma.prismaVersion.client).toEqual(pjson['dependencies']['@prisma/client'])
  })

  it('should query the database', async () => {
    const data = await prisma.user.findMany({
      where: { email: 'alice@prisma.io' },
      select: { email: true, name: true },
    })
    expect(data).toMatchSnapshot()
  })
})
