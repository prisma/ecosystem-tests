const { PrismaClient } = require('./dist/prismaTest')

test('correctly generates browser bundle for prisma at custom path', () => {
  expect(() => new PrismaClient()).toThrow('PrismaClient is unable to be run in the browser')
})
