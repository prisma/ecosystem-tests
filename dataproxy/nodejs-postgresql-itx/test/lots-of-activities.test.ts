import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { config } from '../config'

const activities = config['lots-of-activities'].amount
let timeouts = { maxWait: 2_000, timeout: 5_000 }

if (process.env.DATAPROXY_FLAVOR === 'DP2+Extension' || process.env.DATAPROXY_FLAVOR === 'DP2') {
  timeouts = { maxWait: 30_000, timeout: 50_000 }
}

console.log('timeouts', timeouts)

describe('lots-of-activities', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient()

    if (process.env.DATAPROXY_FLAVOR === 'DP2+Extension') {
      prisma = prisma.$extends(withAccelerate()) as any
    }
  })

  test(
    `should perform ${activities} writes and then ${activities} reads`,
    async () => {
      const emails = new Array(activities)
        .fill(null)
        .map(() => `${faker.string.alphanumeric(10)}@${faker.string.alphanumeric(10)}.com`)

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
      }, timeouts)

      const found = await prisma.user.findMany({
        where: { email: { in: emails } },
      })

      expect(found.length).toEqual(emails.length)
    },
    config.globalTimeout,
  )
})
