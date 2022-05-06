import { Role, Prisma } from '@prisma/client'
import { prisma } from "../prisma";
/** @type {import('./data.json').RequestHandler} */
export async function get({ }) {
  // Keep this type annotation to reproduce the potential problem that would happen when enums imported as values and as types at the same time.
  const enumValue: Role | undefined = Role.ADMIN;

  const createUser = await prisma.user.create({
    data: {
      name: 'Alice',
    },
    select: {
      id: true,
      name: true,
    },
  });

  const updateUser = await prisma.user.update({
    where: {
      id: createUser.id,
    },
    data: {
      name: 'Bob',
    },
    select: {
      name: true,
    },
  });

  const deleteUser = await prisma.user.delete({
    where: {
      id: createUser.id,
    },
    select: {
      name: true,
    },
  });

  const result = {
    createUser: {
      name: createUser.name,
    },
    updateUser,
    deleteUser,
    enumValue
  };

  return {
    status: 404,
    body: JSON.stringify(result)
  };
}
