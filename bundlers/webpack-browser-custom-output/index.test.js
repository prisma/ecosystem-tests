const { PrismaClient } = require('./dist/prismaTest')

test('correctly generates browser bundle for prisma at custom path', async () => {
  await expect(new PrismaClient().user.findFirst()).rejects.toThrow(
    expect.objectContaining({
      message: expect.stringContaining('PrismaClient is unable to run in'),
    }),
  )
})
