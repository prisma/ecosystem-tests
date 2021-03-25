const measure_start = process.hrtime.bigint()

import { PrismaClient, Prisma } from '@prisma/client'

const client = new PrismaClient()

const measure_client = process.hrtime.bigint()
    
export async function handler() {
  
  const measure_handler = process.hrtime.bigint()
  
  await client.user.deleteMany({})

  const measure_delete_1 = process.hrtime.bigint()
  
  const id = '12345'

  const createUser = await client.user.create({
    data: {
      id,
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })

  const measure_create = process.hrtime.bigint()
  
  const updateUser = await client.user.update({
    where: {
      id,
    },
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })

  const measure_update = process.hrtime.bigint()
  
  const users = await client.user.findUnique({
    where: {
      id,
    },
  })

  const measure_find = process.hrtime.bigint()
  
  const deleteManyUsers = await client.user.deleteMany({})

  const measure_delete_2 = process.hrtime.bigint()
  
  return {
    version: Prisma.prismaVersion.client,
    createUser,
    updateUser,
    users,
    deleteManyUsers,
    measurements: {
      client: measure_client-measure_start,
      handler: measure_handler-measure_client,
      delete_1: measure_delete_1-measure_handler,
      create: measure_create-measure_delete_1,
      update: measure_update-measure_create,
      find: measure_find-measure_update,
      delete_2: measure_delete_2-measure_find,
      total_1: measure_delete_2-measure_start,
      total_2: measure_delete_2-measure_handler
    }
  }
}
