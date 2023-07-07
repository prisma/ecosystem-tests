const { faker } = require('@faker-js/faker')
const { PrismaClient } = require('@prisma/client')
const { withAccelerate } = require('@prisma/extension-accelerate')
const { equal } = require('node:assert')
const util = require('util')
const sleep = util.promisify(setTimeout)
const twoMin = 120000

let prisma = new PrismaClient()

if (process.env.DATAPROXY_FLAVOR === 'DP2+Extension') {
  prisma = prisma.$extends(withAccelerate())
}

async function main() {
  const email = faker.internet.email()
  const title = faker.lorem.word()

  const user = await prisma.$transaction(
    async (tx) => {
      sleep(5000)

      const user = await tx.user.create({
        data: {
          email,
        },
      })

      sleep(5000)

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
      maxWait: twoMin,
      timeout: twoMin,
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
