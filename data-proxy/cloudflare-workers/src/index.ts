import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

async function getUsers() {
  const data = await prisma.user.findMany()

  const json = JSON.stringify({ data }, null, 2)

  return new Response(json, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
    }
  })
}

addEventListener("fetch", (event: FetchEvent) => {
  if (new URL(event.request.url).pathname === '/') {
    return event.respondWith(getUsers())
  }
})
