import { PrismaClient } from '@prisma/client'
import fs from 'fs'

describe('N-API', () => {
  test('has n-api library', async () => {
    const files = fs.readdirSync('./node_modules/.prisma/client')
    expect(files).toMatchSnapshot()
  })
  test('generated client', async () => {
    const prisma = new PrismaClient()
    await prisma.$connect()
    await prisma.user.deleteMany()
    const users = await prisma.user.findMany()
    expect(users).toMatchSnapshot()
    const usr = await prisma.user.create({
      data: {
        id: 1,
        name: 'Test',
        email: 'test@example.com',
        posts: {
          create: {
            id: 1,
            title: 'Test',
          },
        },
      },
      include: {
        posts: true,
      },
    })
    const post = await prisma.post.findUnique({
      where: {
        id: usr.posts[0].id,
      },
    })
    expect(post).toMatchSnapshot()
    const postsDeleted = await prisma.post.deleteMany()
    const usersDeleted = await prisma.user.deleteMany()
    expect({
      users: usersDeleted,
      posts: postsDeleted,
    }).toMatchSnapshot()
  })
})
