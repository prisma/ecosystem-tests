import { type PrismaClient } from '../generated/client/index.d.ts'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const Prisma = require('../generated/client/index.js')

// const prisma = new PrismaClient();
const prisma: PrismaClient = new Prisma.PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

const users = await prisma.user.findFirst();
console.log(users)