const { faker } = require('@faker-js/faker')
const { PrismaClient } = require('@prisma/client')
const { withAccelerate } = require('@prisma/extension-accelerate')
const { equal } = require('node:assert')
const util = require('util')
const sleep = util.promisify(setTimeout)
const accelerateItxMax = 15_000

let prisma = new PrismaClient()

if (process.env.DATAPROXY_FLAVOR === 'DP2+Extension') {
  prisma = prisma.$extends(withAccelerate())
}

async function main() {
  const email = faker.internet.email()
  const title = faker.lorem.word()

  const user = await prisma.$transaction(
    async (tx) => {
      await sleep(5_000)

      const user = await tx.user.create({
        data: {
          email,
        },
      })

      await sleep(5_000)

      await tx.post.create({
        data: {
          title,
          author: {
            connect: {
              email,
            },
          },
        },
      })

      return user
    },
    {
      maxWait: 60_000,
      timeout: accelerateItxMax,
    },
  )

  const found = await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      posts: true,
    },
  })

  equal(found?.id, user.id)
  equal(found?.posts[0].title, title)
}

main()
