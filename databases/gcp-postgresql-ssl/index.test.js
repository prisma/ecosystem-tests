const { PrismaClient, Prisma } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.GCP_POSTGRESQL_SSL_DB_URL
      // the secret has extra ../ because Prisma 6 needed them due to how it resolved paths
      .replace('../server-ca.pem', './server-ca.pem')
      .replace('../client-identity.p12', './client-identity.p12'),
  }),
})

const pjson = require('./package.json')

describe('tests for GCP Postgres SSL database', () => {
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
