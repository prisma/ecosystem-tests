import { Photon } from '@prisma/photon'

const photon = new Photon()

export async function handler() {
  const createUser = await photon.users.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })

  const updateUser = await photon.users.update({
    where: {
      id: createUser.id,
    },
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })

  const users = await photon.users.findOne({
    where: {
      id: createUser.id,
    },
  })

  const deleteManyUsers = await photon.users.deleteMany({})

  return {
    createUser,
    updateUser,
    users,
    deleteManyUsers,
  }
}
