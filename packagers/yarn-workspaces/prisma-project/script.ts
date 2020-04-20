import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

async function main() {
  await client.user.deleteMany({})

  const rand = Math.random().toString()

  await client.user.create({
    data: {
      id: rand,
      email: 'alice@prisma.io' + rand,
      name: 'Alice',
      posts: {
        create: {
          title: 'Watch the talks from Prisma Day 2019',
          content: 'https://www.prisma.io/blog/z11sg6ipb3i1/',
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  })

  await client.disconnect()
}

main().catch(async e => {
  console.error(e)
  await client.disconnect()
  process.exit(1)
})
