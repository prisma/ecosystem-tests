// https://nextjs.org/docs/advanced-features/middleware
// https://nextjs.org/docs/api-reference/next/server
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

async function getUsers() {
  // we use a transaction as it has caused issues with tracing
  // `traceparent: undefined` was being passed to the engine
  // but we ultimately want to test that queries are sent well
  const data = await prisma.$transaction([
    prisma.user.findFirst(),
    prisma.user.findMany()
  ])

  return data
}

export function middleware(request: NextRequest) {
  if (new URL(request.url).pathname === '/') {
    const users = getUsers()
    return NextResponse.json(users)
  }
}
