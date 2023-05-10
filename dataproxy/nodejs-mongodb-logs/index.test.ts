import { test, expect, jest } from '@jest/globals'
import { PrismaClient, Prisma } from '@prisma/client'

test('dataproxy logs with mongodb', async () => {
  const prisma = new PrismaClient({
    log: [{ emit: 'event', level: 'query' }],
  })

  const onQuery = jest.fn<(event: Prisma.QueryEvent) => void>()
  prisma.$on('query', onQuery)

  await prisma.user.findMany()

  const lastQueryIndex = onQuery.mock.calls.length - 1
  expect(onQuery.mock.calls[lastQueryIndex][0].query).toMatchInlineSnapshot(
    '"db.User.aggregate([ { $project: { _id: 1, email: 1, name: 1, val: 1, }, }, ])"',
  )
})
