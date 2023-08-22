const { PrismaClient } = require('./dist/prismaTest')

test('correctly generates browser bundle for prisma at custom path', async () => {
  try {
    await new PrismaClient().user.findFirst()
  } catch (e) {
    expect(e.message).toContain('PrismaClient is unable to run in')
  }
})
