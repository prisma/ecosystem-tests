import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

describe('lots-of-activities', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient()
  })

  test('should perform 1000 writes and then 1000 reads', async () => {
    const emails = new Array(1000)
      .fill(null)
      .map(() => `${faker.random.alphaNumeric(10)}@${faker.random.alphaNumeric(10)}.com`)

    await prisma.$transaction(async (tx) => {
      await Promise.all(
        emails.map(async (email) => {
          await tx.user.create({
            data: {
              email,
            },
          })
        }),
      )

      await Promise.all(
        emails.map(async (email) => {
          const found = await tx.user.findFirst({
            where: { email },
          })

          expect(found).toBeTruthy()
        }),
      )
    })

    const found = await prisma.user.findMany({
      where: { email: { in: emails } },
    })

    expect(found.length).toEqual(emails.length)
  })
})
