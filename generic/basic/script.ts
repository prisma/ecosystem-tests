import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

// A `main` function so that we can use async/await
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

  const user = await client.user.findOne({
    where: {
      id: rand,
    },
  })

  const expect = JSON.stringify({
    id: rand,
    email: 'alice@prisma.io' + rand,
    name: 'Alice'
  })

  if (JSON.stringify(user) !== expect) {
    console.error('expected', expect, 'got', user)
    process.exit(1)
  }

  console.log('success')

  await client.disconnect()
}

main().catch(async e => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await client.disconnect()
})
