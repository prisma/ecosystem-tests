const process = require('process');
const execa = require('execa');

const measure_start = process.hrtime.bigint()

function wait(ms: number) {
  var start = Date.now(),
      now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT']

import { PrismaClient, Prisma } from '@prisma/client'

const client = new PrismaClient()

const measure_client = process.hrtime.bigint()

export async function handler() {
  
  console.log('handler!')

  try {
    const { stdout } = execa.sync('pscale', ['version'])
    console.log('version', stdout)
  } catch (error) {
    console.log(error)
  }
  
  try {
    const { stdout, stderr } = execa.sync('pscale', ['connect', 'e2e-tests', 'main'], { env: process.env, timeout: 5000 }) //, detached: true })
    console.log("spawned `pscale connect` successfully", stdout, stderr)
    //wait(3000)
    //console.log("and waited 3 seconds")
  } catch (error) {
    console.log(error)
  }
  
  const measure_planetscale = process.hrtime.bigint()

  const measure_handler = process.hrtime.bigint()
  
  await client.$connect()

  const measure_connect = process.hrtime.bigint()

  await client.user.deleteMany({})
  
  const id = '12345'

  const createUser = await client.user.create({
    data: {
      id,
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })
  
  const updateUser = await client.user.update({
    where: {
      id,
    },
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })
  
  const users = await client.user.findUnique({
    where: {
      id,
    },
  })
  
  const deleteManyUsers = await client.user.deleteMany({})

  const measure_end = process.hrtime.bigint()
  
  return {
    version: Prisma.prismaVersion.client,
    createUser,
    updateUser,
    users,
    deleteManyUsers,
    measurements: {
      outside_handler: Number(measure_client-measure_start) / 1000000000,
      planetsacle:  Number(measure_planetscale-measure_start) / 1000000000,
      inside_handler: Number(measure_end-measure_handler) / 1000000000,
      inside_handler_connect: Number(measure_connect-measure_handler) / 1000000000,
      inside_handler_queries: Number(measure_end-measure_connect) / 1000000000,
      since_environment_start: Number(measure_end-measure_start) / 1000000000,
    }
  }
}
