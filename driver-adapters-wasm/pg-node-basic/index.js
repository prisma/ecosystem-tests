// @ts-check
const { Prisma, PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

exports.handler = async () => {
  const getResult = async (prisma) => ({
    prismaVersion: Prisma.prismaVersion.client,
    deleteMany: await prisma.user.deleteMany().then(() => ({ count: 0 })),
    create: await prisma.user.create({
      data: {
        email: `test-1@prisma.io`,
        age: 27,
        name: 'Test 1',
      },
      select: {
        email: true,
        age: true,
        name: true,
      },
    }),
    createMany: await prisma.user.createMany({
      data: [
        {
          email: `test-2@prisma.io`,
          age: 29,
          name: 'Test 2',
        },
        {
          email: `test-3@prisma.io`,
          age: 29,
          name: 'Test 3',
        },
      ],
    }),
    createManyAndReturn: await prisma.user.createManyAndReturn({
      select: {
        email: true,
        name: true,
      },
      data: [
        {
          email: `test-4@prisma.io`,
          age: 30,
          name: 'Test 4',
        },
        {
          email: `test-5@prisma.io`,
          age: 31,
          name: 'Test 5',
        },
      ],
    }),
    findMany: await prisma.user.findMany({
      select: {
        email: true,
        age: true,
        name: true,
      },
      orderBy: {
        email: 'asc',
      },
    }),
    findUnique: await prisma.user.findUnique({
      where: {
        email: 'test-1@prisma.io',
      },
      select: {
        email: true,
        age: true,
        name: true,
      },
    }),
    update: await prisma.user.update({
      where: {
        email: 'test-1@prisma.io',
      },
      data: {
        age: 26,
      },
      select: {
        email: true,
        age: true,
        name: true,
      },
    }),
    updateMany: await prisma.user.updateMany({
      where: {
        age: 26,
      },
      data: {
        age: 27,
      },
    }),
    findFirst: await prisma.user.findFirst({
      where: {
        age: 27,
      },
      select: {
        email: true,
        age: true,
        name: true,
      },
    }),
    delete: await prisma.user.delete({
      where: {
        email: 'test-1@prisma.io',
      },
      select: {
        email: true,
        age: true,
        name: true,
      },
    }),
    count: await prisma.user.count(),
    aggregate: await prisma.user
      .aggregate({
        _avg: {
          age: true,
        },
      })
      .then(({ _avg }) => ({ age: Math.trunc(_avg?.age ?? 0) })),
    groupBy: await prisma.user.groupBy({
      by: ['age'],
      _count: {
        age: true,
      },
    }),
    findFirstOrThrow: await prisma.user.findFirstOrThrow({
      select: {
        age: true,
        email: true,
        name: true,
      },
    }),
    findUniqueOrThrow: await prisma.user.findUniqueOrThrow({
      where: {
        email: 'test-2@prisma.io',
      },
      select: {
        age: true,
        email: true,
        name: true,
      },
    }),
    upsert: await prisma.user.upsert({
      where: {
        email: 'test-upsert@prisma.io',
      },
      create: {
        email: 'test-upsert@prisma.io',
        age: 30,
        name: 'Test upsert',
      },
      update: {},
      select: {
        email: true,
        age: true,
        name: true,
      },
    }),
  })

  const regResult = await getResult(prisma).catch((error) => ({ error: error.message }))
  const itxResult = await prisma.$transaction(getResult).catch((error) => ({ error: error.message }))
  const result = { itxResult, regResult }

  return result
}
