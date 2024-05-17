const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

console.log("foo")
const users = await prisma.user.findFirst();
console.log(users)