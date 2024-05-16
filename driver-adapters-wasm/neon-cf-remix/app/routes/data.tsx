import { LoaderFunctionArgs, json } from '@remix-run/cloudflare'
import { getDb } from '~/db.server'
import { Prisma, type PrismaClient } from '@prisma/client'

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    env: {
      DRIVER_ADAPTERS_NEON_CF_REMIX_DATABASE_URL: string
    }
  }
}

async function getResult(prisma: PrismaClient | Prisma.TransactionClient) {
  return {
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
        age: true,
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
          age: 30,
          name: 'Test 5',
        },
        {
          email: `test-6@prisma.io`,
          age: 30,
          name: 'Test 6',
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
      orderBy: {
        _count: {
          age: 'asc',
        },
      },
    }),
    findFirstOrThrow: await prisma.user.findFirstOrThrow({
      select: {
        age: true,
        email: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
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
  }
}

export async function loader({ context }: LoaderFunctionArgs) {
  const db = getDb(context.env.DRIVER_ADAPTERS_NEON_CF_REMIX_DATABASE_URL)
  const regResult = await getResult(db).catch((error) => ({ error: error.message }))
  const itxResult = await db.$transaction(getResult).catch((error) => ({ error: error.message }))

  return json({
    regResult,
    itxResult,
  })
}
