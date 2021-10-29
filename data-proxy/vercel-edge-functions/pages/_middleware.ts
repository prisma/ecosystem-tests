import type { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

async function getUsers() {
  const data = await prisma.user.findMany()

  const json = JSON.stringify({ data })

  return new Response(json, {
    status: 200,
    headers: {
      "content-type": "application/json;charset=UTF-8"
    }
  })
}

export function middleware(request: NextRequest) {
  if (new URL(request.url).pathname === '/') {
    return getUsers()
  }
}
