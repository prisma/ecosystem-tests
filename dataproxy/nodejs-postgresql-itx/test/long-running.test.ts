import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import util from 'util'
import { prismaClientVersion } from './utils'
import { config } from '../config'

const testIf = (condition: boolean) => (condition ? test : test.skip)
const sleep = util.promisify(setTimeout)
const accelerateItxMax = 15_000
const dp1ItxTimeout = 60_000

describe('long-running', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient()

    if (process.env.DATAPROXY_FLAVOR === 'DP2+Extension') {
      prisma = prisma.$extends(withAccelerate()) as any
    }
  })

  test('should throw error on long-running itx for default 5s timeout', async () => {
    const result = prisma.$transaction(async (tx) => {
      await tx.user.findMany({})

      await sleep(6_000)
    })

    await expect(result).rejects.toMatchObject({
      message: expect.stringContaining('Transaction API error: Transaction already closed'),
      code: 'P2028',
      clientVersion: prismaClientVersion,
    })
  })

  testIf(process.env.DATAPROXY_FLAVOR !== 'DP1')(
    'accelerate only: should throw an error on long-running itx that sets a timeout limit over the limit',
    async () => {
      const email = faker.internet.email()

      const result = prisma.$transaction(
        async (tx) => {
          return tx.user.create({
            data: {
              email,
            },
          })
        },
        {
          maxWait: 20_000,
          timeout: accelerateItxMax + 54_321, // this should trigger an error
        },
      )

      // Example error:
      // [BadRequestError: This request could not be understood by the server: {"type":"UnknownJsonError","body":{"code":"P6005","message":"An invalid parameter was provided. Interactive transactions running through Accelerate are limited to a max timeout of 15000ms"}} (The request id was: 8057295d4d232681)]`)
      await expect(result).rejects.toMatchObject({
        message: expect.stringContaining(
          'This request could not be understood by the server: {"type":"UnknownJsonError","body":{"code":"P6005","message":"An invalid parameter was provided. Interactive transactions running through Accelerate are limited to a max timeout of 15000ms"}} (The request id was:',
        ),
        code: 'P5000',
        clientVersion: prismaClientVersion,
      })
    },
    config.globalTimeout,
  )

  testIf(process.env.DATAPROXY_FLAVOR !== 'DP1')(
    'accelerate only: should run a transaction for ~+13s and then still succeed',
    async () => {
      const email = faker.internet.email()

      const user = await prisma.$transaction(
        async (tx) => {
          await sleep(13_000)

          return tx.user.create({
            data: {
              email,
            },
          })
        },
        {
          maxWait: 20_000,
          timeout: accelerateItxMax,
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

  testIf(process.env.DATAPROXY_FLAVOR === 'DP1')(
    'DP1 only: should run a transaction for 1 min and then still succeed',
    async () => {
      const email = faker.internet.email()

      const user = await prisma.$transaction(
        async (tx) => {
          await sleep(dp1ItxTimeout - 5_000)

          return tx.user.create({
            data: {
              email,
            },
          })
        },
        {
          maxWait: 20_000,
          timeout: dp1ItxTimeout,
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
