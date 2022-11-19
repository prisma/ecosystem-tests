import { PrismaClient } from '@prisma/client'
import util from 'util'
import { prismaClientVersion } from './utils'

const prisma = new PrismaClient()
const sleep = util.promisify(setTimeout)

describe('prisma-client', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  /**
   * Minimal example of an interactive transaction
   */
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

  /**
   * Transactions should fail after the default timeout
   */
  test('timeout default', async () => {
    const result = prisma.$transaction(async (prisma) => {
      await prisma.user.create({
        data: {
          email: 'user_1@website.com',
        },
      })

      await sleep(9000)
    })

    await expect(result).rejects.toMatchObject({
      message: expect.stringContaining('Transaction API error: Transaction already closed'),
      code: 'P2028',
      clientVersion: prismaClientVersion,
    })

    expect(await prisma.user.findMany()).toHaveLength(0)
  })

  /**
   * Transactions should fail if they time out on `timeout`
   */
  test('timeout override', async () => {
    const result = prisma.$transaction(
      async (prisma) => {
        await prisma.user.create({
          data: {
            email: 'user_1@website.com',
          },
        })

        await new Promise((res) => setTimeout(res, 600))
      },
      {
        maxWait: 200,
        timeout: 500,
      },
    )

    await expect(result).rejects.toMatchObject({
      message: expect.stringContaining('Transaction API error: Transaction already closed'),
    })

    expect(await prisma.user.findMany()).toHaveLength(0)
  })

  /**
   * Transactions should fail and rollback if thrown within
   */
  test('rollback throw', async () => {
    const result = prisma.$transaction(async (prisma) => {
      await prisma.user.create({
        data: {
          email: 'user_1@website.com',
        },
      })

      throw new Error('you better rollback now')
    })

    await expect(result).rejects.toThrow(`you better rollback now`)

    const users = await prisma.user.findMany()

    expect(users.length).toBe(0)
  })

  /**
   * Transactions should fail and rollback if a value is thrown within
   */
  test('rollback throw value', async () => {
    const result = prisma.$transaction(async (prisma) => {
      await prisma.user.create({
        data: {
          email: 'user_1@website.com',
        },
      })

      throw 'you better rollback now'
    })

    await expect(result).rejects.toBe(`you better rollback now`)

    const users = await prisma.user.findMany()

    expect(users.length).toBe(0)
  })

  /**
   * We don't allow certain methods to be called in a transaction
   */
  test('forbidden', async () => {
    const forbidden = ['$connect', '$disconnect', '$on', '$transaction', '$use']
    expect.assertions(forbidden.length + 1)

    const result = prisma.$transaction((prisma) => {
      for (const method of forbidden) {
        expect(prisma).not.toHaveProperty(method)
      }
      return Promise.resolve()
    })

    await expect(result).resolves.toBe(undefined)
  })

  /**
   * If one of the query fails, all queries should cancel
   */
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

    await expect(result).rejects.toThrow('Unique constraint failed on the constraint')

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
      message: expect.stringContaining('Transaction API error: Transaction already closed'),
      code: 'P2028',
      clientVersion: prismaClientVersion,
    })

    await expect(result).rejects.toThrow('Transaction already closed')

    const users = await prisma.user.findMany()

    expect(users.length).toBe(0)
  })

  /**
   * Batching should work with using the interactive transaction logic
   */
  test('batching', async () => {
    await prisma.$transaction([
      prisma.user.create({
        data: {
          email: 'user_1@website.com',
        },
      }),
      prisma.user.create({
        data: {
          email: 'user_2@website.com',
        },
      }),
    ])

    const users = await prisma.user.findMany()

    expect(users.length).toBe(2)
  })

  test('batching rollback', async () => {
    const result = prisma.$transaction([
      prisma.user.create({
        data: {
          email: 'user_1@website.com',
        },
      }),
      prisma.user.create({
        data: {
          email: 'user_1@website.com',
        },
      }),
    ])

    await expect(result).rejects.toThrow('')

    const users = await prisma.user.findMany()

    expect(users.length).toBe(0)
  })

  // running this test on isolated prisma instance since
  // middleware change the return values of model methods
  // and this would affect subsequent tests if run on a main instance
  describe('middlewares', () => {
    /**
     * Minimal example of a interactive transaction & middleware
     */
    test('middleware basic', async () => {
      const isolatedPrisma = new PrismaClient()
      let runInTransaction = false

      isolatedPrisma.$use(async (params, next) => {
        await next(params)

        runInTransaction = params.runInTransaction

        return 'result'
      })

      const result = await isolatedPrisma.$transaction((prisma) => {
        return prisma.user.create({
          data: {
            email: 'user_1@website.com',
          },
        })
      })

      expect(result).toBe('result')
      expect(runInTransaction).toBe(true)
    })

    /**
     * Middlewares should work normally on batches
     */
    test('middlewares batching', async () => {
      const isolatedPrisma = new PrismaClient()

      isolatedPrisma.$use(async (params, next) => {
        const result = await next(params)

        return result
      })

      await isolatedPrisma.$transaction([
        prisma.user.create({
          data: {
            email: 'user_1@website.com',
          },
        }),
        prisma.user.create({
          data: {
            email: 'user_2@website.com',
          },
        }),
      ])

      const users = await prisma.user.findMany()

      expect(users.length).toBe(2)
    })

    test('middleware exclude from transaction', async () => {
      const isolatedPrisma = new PrismaClient()

      isolatedPrisma.$use((params, next) => {
        return next({ ...params, runInTransaction: false })
      })

      await isolatedPrisma
        .$transaction(async (prisma) => {
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
        .catch((e) => {})

      const users = await isolatedPrisma.user.findMany()
      expect(users).toHaveLength(1)
    })
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

  test('high concurrency', async () => {
    jest.setTimeout(30_000)

    await prisma.user.create({
      data: {
        email: 'x',
        name: 'y',
      },
    })

    for (let i = 0; i < 5; i++) {
      await Promise.allSettled([
        prisma.$transaction((tx) => tx.user.update({ data: { name: 'a' }, where: { email: 'x' } }), { timeout: 25 }),
        prisma.$transaction((tx) => tx.user.update({ data: { name: 'b' }, where: { email: 'x' } }), { timeout: 25 }),
        prisma.$transaction((tx) => tx.user.update({ data: { name: 'c' }, where: { email: 'x' } }), { timeout: 25 }),
        prisma.$transaction((tx) => tx.user.update({ data: { name: 'd' }, where: { email: 'x' } }), { timeout: 25 }),
        prisma.$transaction((tx) => tx.user.update({ data: { name: 'e' }, where: { email: 'x' } }), { timeout: 25 }),
        prisma.$transaction((tx) => tx.user.update({ data: { name: 'f' }, where: { email: 'x' } }), { timeout: 25 }),
        prisma.$transaction((tx) => tx.user.update({ data: { name: 'g' }, where: { email: 'x' } }), { timeout: 25 }),
        prisma.$transaction((tx) => tx.user.update({ data: { name: 'h' }, where: { email: 'x' } }), { timeout: 25 }),
        prisma.$transaction((tx) => tx.user.update({ data: { name: 'i' }, where: { email: 'x' } }), { timeout: 25 }),
        prisma.$transaction((tx) => tx.user.update({ data: { name: 'j' }, where: { email: 'x' } }), { timeout: 25 }),
      ]).catch(() => {}) // we don't care for errors, there will be
    }
  })

  /**
   * Rollback should happen even with `then` calls
   */
  test('rollback with then calls', async () => {
    const result = prisma.$transaction(async (prisma) => {
      await prisma.user
        .create({
          data: {
            email: 'user_1@website.com',
          },
        })
        .then()

      await prisma.user
        .create({
          data: {
            email: 'user_2@website.com',
          },
        })
        .then()
        .then()

      throw new Error('rollback')
    })

    await expect(result).rejects.toThrow(`rollback`)

    const users = await prisma.user.findMany()

    expect(users.length).toBe(0)
  })

  /**
   * Rollback should happen even with `catch` calls
   */
  test('rollback with catch calls', async () => {
    const result = prisma.$transaction(async (prisma) => {
      await prisma.user
        .create({
          data: {
            email: 'user_1@website.com',
          },
        })
        .catch()
      await prisma.user
        .create({
          data: {
            email: 'user_2@website.com',
          },
        })
        .catch()
        .then()

      throw new Error('rollback')
    })

    await expect(result).rejects.toThrow(`rollback`)

    const users = await prisma.user.findMany()

    expect(users.length).toBe(0)
  })

  /**
   * Rollback should happen even with `finally` calls
   */
  test('rollback with finally calls', async () => {
    const result = prisma.$transaction(async (prisma) => {
      await prisma.user
        .create({
          data: {
            email: 'user_1@website.com',
          },
        })
        .finally()

      await prisma.user
        .create({
          data: {
            email: 'user_2@website.com',
          },
        })
        .then()
        .catch()
        .finally()

      throw new Error('rollback')
    })

    await expect(result).rejects.toThrow(`rollback`)

    const users = await prisma.user.findMany()

    expect(users.length).toBe(0)
  })
})
