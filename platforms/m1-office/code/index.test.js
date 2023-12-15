const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient()

describe('Prisma', () => {
  afterAll(() => {
    prisma.$disconnect()
  })

  it('should test Prisma version', () => {
    const pjson = require('./package.json')
    expect(Prisma.prismaVersion.client).toBe(
      pjson.dependencies['@prisma/client'],
    )
  })

  it('should query the database', async () => {
    const data = await prisma.user.findMany()
    expect(data).toMatchObject([])
  })

  // TODO Check for engine files depending on env var
  
})
