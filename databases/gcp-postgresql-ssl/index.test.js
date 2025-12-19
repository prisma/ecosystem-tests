const { PrismaClient, Prisma } = require('./generated/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const fs = require('fs')

const url = new URL(process.env.GCP_POSTGRESQL_SSL_DB_URL)
for (const key of ['sslmode', 'sslcert', 'sslidentity', 'sslpassword', 'sslaccept']) {
  url.searchParams.delete(key)
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: url.toString(),
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync('./server-ca.pem').toString(),
      key: fs.readFileSync('./client-key.pem').toString(),
      cert: fs.readFileSync('./client-cert.pem').toString(),
    },
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
