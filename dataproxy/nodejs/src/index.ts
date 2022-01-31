import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

export function getUsers() {
  // we use a transaction as it has caused issues with tracing
  // `traceparent: undefined` was being passed to the engine
  // but we ultimately want to test that queries are sent well
  return prisma.$transaction([
    prisma.user.findFirst(),
    prisma.user.findMany()
  ])
}

