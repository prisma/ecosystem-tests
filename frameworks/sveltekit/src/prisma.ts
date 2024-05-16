import { PrismaClient } from '@prisma/client'

export let prisma: PrismaClient

prisma = new PrismaClient()
