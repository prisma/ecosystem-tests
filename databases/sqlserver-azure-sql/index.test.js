const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

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
