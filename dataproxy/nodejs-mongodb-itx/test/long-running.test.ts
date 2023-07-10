import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import util from 'util'
import { prismaClientVersion } from './utils'
import { config } from '../config'
import { withAccelerate } from '@prisma/extension-accelerate'

const delay = util.promisify(setTimeout)
const buffer = 12000

const transactionDelay = config['long-running'].transactionDelay

describe('long-running', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient()

    if (process.env.DATAPROXY_FLAVOR === 'DP2+Extension') {
      prisma = prisma.$extends(withAccelerate()) as any
    }
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
    'should run a transaction for 2 mins and then still succeed',
    async () => {
      const email = faker.internet.email()

      const user = await prisma.$transaction(
        async (tx) => {
          await delay(transactionDelay)

          return tx.user.create({
            data: {
              email,
            },
          })
        },
        {
          maxWait: transactionDelay + buffer,
          timeout: transactionDelay + buffer,
        },
      )

      const found = await prisma.user.findFirst({
        where: {
          id: user.id,
        },
      })

      expect(found?.email).toEqual(email)
    },
    config.globalTimeout,
  )
})
