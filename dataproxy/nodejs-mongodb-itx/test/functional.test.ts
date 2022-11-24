import { PrismaClient } from '@prisma/client'
import util from 'util'

const prisma = new PrismaClient()
const sleep = util.promisify(setTimeout)

describe('interactive transactions', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  test('basic', async () => {
    const result = await prisma.$transaction(async (prisma) => {
      await prisma.user.create({
        data: {
          email: 'user_1@website.com',
        },
      })

      await prisma.user.create({
        data: {
          email: 'user_2@website.com',
        },
      })

      return prisma.user.findMany()
    })

    expect(result.length).toBe(2)
  })

  test('timeout', async () => {
    const result = prisma.$transaction(
      async (prisma) => {
        await prisma.user.create({
          data: {
            email: 'user_1@website.com',
          },
        })

        await sleep(600)
      },
      {
        maxWait: 200,
        timeout: 500,
      },
    )

    await expect(result).rejects.toMatchObject({
      code: 'P2028',
    })

    expect(await prisma.user.findMany()).toHaveLength(0)
  })

  test('rollback throw', async () => {
    const result = prisma.$transaction(async (prisma) => {
      await prisma.user.create({
        data: {
          email: 'user_1@website.com',
        },
      })

      throw new Error('you better rollback now')
    })

    await expect(result).rejects.toThrow()

    const users = await prisma.user.findMany()

    expect(users.length).toBe(0)
  })

  test('rollback query', async () => {
    const result = prisma.$transaction(async (prisma) => {
      await prisma.user.create({
        data: {
          email: 'user_1@website.com',
        },
      })

      await prisma.user.create({
        data: {
          email: 'user_1@website.com',
        },
      })
    })

    await expect(result).rejects.toThrow('Unique constraint failed on the fields: (`email`)')

    const users = await prisma.user.findMany()

    expect(users.length).toBe(0)
  })

  test('already committed', async () => {
    let transactionBoundPrisma
    await prisma.$transaction((prisma) => {
      transactionBoundPrisma = prisma
      return Promise.resolve()
    })

    const result = prisma.$transaction(async () => {
      await transactionBoundPrisma.user.create({
        data: {
          email: 'user_1@website.com',
        },
      })
    })

    await expect(result).rejects.toMatchObject({
      code: 'P2028',
    })

    const users = await prisma.user.findMany()

    expect(users.length).toBe(0)
  })

  /**
   * Two concurrent transactions should work
   */
  test('concurrent', async () => {
    await Promise.all([
      prisma.$transaction([
        prisma.user.create({
          data: {
            email: 'user_1@website.com',
          },
        }),
      ]),
      prisma.$transaction([
        prisma.user.create({
          data: {
            email: 'user_2@website.com',
          },
        }),
      ]),
    ])

    const users = await prisma.user.findMany()

    expect(users.length).toBe(2)
  })
})
