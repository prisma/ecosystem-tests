import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from "@prisma/extension-accelerate"
import util from 'util'
import { config } from '../config'

const delay = util.promisify(setTimeout)
const buffer = 12000

const { batchAmount, transactionDelay } = config['batch-itx']

describe('batch-itx', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient()

    if (process.env.DATAPROXY_FLAVOR === 'DP2+Extension') {
      prisma = prisma.$extends(withAccelerate()) as any
    }
  })

  test(
    'should perform a batch write and update inside an itx with timeout',
    async () => {
      const emails = new Array(batchAmount)
        .fill(null)
        .map(() => `${faker.string.alphanumeric(10)}@${faker.string.alphanumeric(10)}.com`)

      const randomValue = Number(faker.string.numeric(5))

      const users = await prisma.$transaction(
        async (tx) => {
          await tx.user.createMany({
            data: emails.map((e) => ({
              email: e,
              val: randomValue,
            })),
          })

          await delay(transactionDelay)

          await tx.user.updateMany({
            where: { val: randomValue },
            data: {
              val: randomValue + 1,
            },
          })

          const users = await tx.user.findMany({
            where: {
              email: {
                in: emails,
              },
            },
          })

          users.forEach((user) => {
            expect(user.val).toEqual(randomValue + 1)
          })

          return users
        },
        {
          maxWait: transactionDelay + buffer,
          timeout: transactionDelay + buffer,
        },
      )

      expect(users.length).toBe(batchAmount)
    },
    config.globalTimeout,
  )
})
