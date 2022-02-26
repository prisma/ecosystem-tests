// @ts-check
const PrismaClient = require('@prisma/client').PrismaClient
const fs = require('fs')
const path = require('path')
let data = {}
async function main() {
  const prisma = new PrismaClient()
  await prisma.$connect()
  await prisma.user.deleteMany()
  const users = await prisma.user.findMany()
  data['users.findMany'] = users
  const created = await prisma.user.create({
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
  data['user.create'] = created

  const post = await prisma.post.findUnique({
    where: {
      id: created.posts[0].id,
    },
  })
  data['post.findUnique'] = post

  const postsDeleted = await prisma.post.deleteMany()
  const usersDeleted = await prisma.user.deleteMany()
  data['delete'] = {
    users: usersDeleted,
    posts: postsDeleted,
  }
  // @ts-ignore
  data['clientEngine'] = prisma._clientEngineType
  await prisma.$disconnect()
  fs.writeFileSync(
    path.join(__dirname, './data.json'),
    JSON.stringify(data, undefined, 2),
    {
      encoding: 'utf8',
    },
  )
}
main()
