import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import util from 'util'
import { prismaClientVersion } from './utils'
const delay = util.promisify(setTimeout)
const twoMins = 120000
const buffer = twoMins + 4000

describe('long-running', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient()
  })

  test('should throw error on long-running itx', async () => {
    const result = prisma.$transaction(async (tx) => {
      await tx.user.findMany({})

      await delay(6000)
    })

    await expect(result).rejects.toMatchObject({
      message: expect.stringContaining('Transaction API error: Transaction already closed'),
      code: 'P2028',
      clientVersion: prismaClientVersion,
    })
  })

  test(
    'should run a transaction for 6 mins and then still succeed',
    async () => {
      const email = faker.internet.email()

      const user = await prisma.$transaction(
        async (tx) => {
          await delay(twoMins)

          return tx.user.create({
            data: {
              email,
            },
          })
        },
        {
          maxWait: twoMins + buffer,
          timeout: twoMins + buffer,
        },
      )

      const found = await prisma.user.findFirst({
        where: {
          id: user.id,
        },
      })

      expect(found?.email).toEqual(email)
    },
    twoMins + buffer,
  )
})
