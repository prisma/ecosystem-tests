// Note: see wrangler.toml and https://www.npmjs.com/package/@cloudflare/workers-types for the version
/// <reference types="@cloudflare/workers-types" />
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

let prisma = new PrismaClient({})

if ((globalThis as any)['DATAPROXY_FLAVOR'] === 'DP2+Extension') {
  prisma = prisma.$extends(withAccelerate()) as any
}

async function getUsers() {
  console.debug(new Date(), 'Start await prisma.$transaction')
  console.time('transactionTook')
  const data = await prisma.$transaction([prisma.user.findFirst(), prisma.user.findMany()])
  console.timeEnd('transactionTook')
  console.debug(new Date(), 'End await prisma.$transaction')

  const json = JSON.stringify({ data })

  return new Response(json, {
    status: 200,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

addEventListener('fetch', (event: FetchEvent) => {
  if (new URL(event.request.url).pathname === '/') {
    return event.respondWith(getUsers())
  }
})
