const process = require('process');
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
      client: Number(measure_client-measure_start) / 1000000000,
      handler: Number(measure_handler-measure_client) / 1000000000,
      delete_1: Number(measure_delete_1-measure_handler) / 1000000000,
      create: Number(measure_create-measure_delete_1) / 1000000000,
      update:Number( measure_update-measure_create) / 1000000000,
      find: Number(measure_find-measure_update) / 1000000000,
      delete_2: Number(measure_delete_2-measure_find) / 1000000000,
      total_1: Number(measure_delete_2-measure_start) / 1000000000,
      total_2: Number(measure_delete_2-measure_handler) / 1000000000
    }
  }
}
