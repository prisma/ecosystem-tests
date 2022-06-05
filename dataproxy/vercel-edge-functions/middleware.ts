import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client/edge'

const prisma = new PrismaClient({})

async function getUsers() {
  const data = await prisma.$transaction([
    prisma.user.findFirst(),
    prisma.user.findMany()
  ])

  return JSON.stringify({ data })
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(`/api?users=${await getUsers()}`, request.url));
  }
}
