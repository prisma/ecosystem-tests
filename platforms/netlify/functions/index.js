const { Photon } = require('./generated/photon')

const photon = new Photon()

exports.handler = async function(event, context, callback) {
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

  const deleteManyUsers = await photon.users.deleteMany()

  return {
    statusCode: 200,
    body: JSON.stringify({
      createUser,
      updateUser,
      users,
      deleteManyUsers,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}
