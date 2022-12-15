import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  /* truncate tables */
  await prisma.post.deleteMany()
  await prisma.someUser.deleteMany()

  // create users
  const N_USERS = 2
  const userIds = Array.from({ length: N_USERS }, (_, i) => i + 1)

  // create posts per user
  const N_POSTS_PER_USER = 100
  const postsToCreate = Array.from({ length: N_USERS * N_POSTS_PER_USER }, (_, i) => ({
    id: i + 1,
    userId: Math.floor(i / N_POSTS_PER_USER) + 1
  }))

  // some users reportedly had issues with $queryRaw on Alpine, although we can't reproduce it
  // as we don't have enough info yet: https://github.com/prisma/prisma/issues/16553#issuecomment-1351401455
  await prisma.$queryRaw`SELECT 1`

  console.log('creating users...')
  await prisma.someUser.createMany({
    data: userIds.map((id) => ({ id })),
  })

  console.log('creating posts...')
  await prisma.post.createMany({
    data: postsToCreate,
  })
}

main()
  .finally(() => {
    prisma.$disconnect()
  })
