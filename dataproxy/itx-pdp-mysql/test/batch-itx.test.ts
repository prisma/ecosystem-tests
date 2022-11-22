import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import util from 'util'
import { config } from '../config'

const delay = util.promisify(setTimeout)
const buffer = 12000

const { batchAmount, transactionDelay } = config['batch-itx']

describe('batch-itx', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient()
  })

  test(
    'should perform a batch write and update inside a itx with timeout',
    async () => {
      const emails = new Array(batchAmount)
        .fill(null)
        .map(() => `${faker.random.alphaNumeric(10)}@${faker.random.alphaNumeric(10)}.com`)

      const randomValu = Number(faker.random.numeric(5))

      await prisma.$transaction(
        async (tx) => {
          await tx.user.createMany({
            data: emails.map((e) => ({
              email: e,
              val: randomValu,
            })),
          })

          await delay(transactionDelay)

          await tx.user.updateMany({
            where: { val: randomValu },
            data: {
              val: randomValu + 1,
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
            expect(user.val).toEqual(randomValu + 1)
          })

          return users
        },
        {
          maxWait: transactionDelay + buffer,
          timeout: transactionDelay + buffer,
        },
      )
    },
    transactionDelay + buffer,
  )
})
