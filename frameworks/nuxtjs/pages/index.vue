<template>
  <div>
    <p>Hi from {{ JSON.stringify(result) }}</p>
    <NLink to="/">
      Home page
    </NLink>
  </div>
</template>

<script>
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export default {
  async asyncData () {
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
        id: createUser.id,
      },
      data: {
        email: 'bob@prisma.io',
        name: 'Bob',
      },
    })

    const users = await client.user.findOne({
      where: {
        id: createUser.id,
      },
    })

    const deleteManyUsers = await client.user.deleteMany({})

    return {
      result: {
        createUser,
        updateUser,
        users,
        deleteManyUsers,
      },
      name: process.static ? 'static' : (process.server ? 'server' : 'client'),
    }
  },
  head: {
    title: 'Home',
  }
}
</script>
