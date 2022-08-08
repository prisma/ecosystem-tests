import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client/edge'

const prisma = new PrismaClient({})

async function getUsers() {
  console.debug(new Date(), "Start await prisma.$transaction")
  console.time('getUsersTransactionTook');
  const data = await prisma.$transaction([
    prisma.user.findFirst(),
    prisma.user.findMany()
  ])
  console.timeEnd('getUsersTransactionTook');
  console.debug(new Date(), "End await prisma.$transaction")

  return JSON.stringify({ data })
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(`/api?users=${await getUsers()}`, request.url));
  }
}
