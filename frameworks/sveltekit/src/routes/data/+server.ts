import { Role } from '@prisma/client'
import { prisma } from "../../prisma";

/** @type {import('./$types').RequestHandler} */
export async function GET({ }) {
  const enumValue = Role.ADMIN;

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

  return new Response(JSON.stringify(result))
}
