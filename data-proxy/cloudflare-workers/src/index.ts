import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

async function prismaStuff() {
  const timeBegin = Date.now()

  await prisma.user.create({
    data: {
      email: Date.now() + "@email.com"
    }
  })

  const data = await prisma.user.findMany()

  const timeEnd = Date.now()

  console.log(timeEnd - timeBegin)

  const json = JSON.stringify({ data }, null, 2)

  return new Response(json, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
    }
  })
}

addEventListener("fetch", (event: FetchEvent) => {
  if (new URL(event.request.url).pathname === '/') {
    return event.respondWith(prismaStuff())
  }
})
