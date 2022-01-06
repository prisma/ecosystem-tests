import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  console.log("before any action")
  
  await client.user.deleteMany({})
  console.log("deleted all users")
            
  const objectId = '6d795f757365725f69643030'

  const user_created = await client.user.create({
    data: {
      id: objectId,
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })
  console.log("user_created", user_created)

  const users = await client.user.findMany()
  console.log("users", users)
  
  const user = await client.user.findUnique({
    where: {
      id: objectId,
    },
  })
  console.log("user", user)

  const expect = JSON.stringify({
    id: objectId,
    email: 'alice@prisma.io',
    name: 'Alice',
  })

  if (JSON.stringify(user) !== expect) {
    console.error('expected', expect, 'got', user)
    process.exit(1)
  }

  console.log('success')

  await client.$disconnect()
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await client.$disconnect()
  })
