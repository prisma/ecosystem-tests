import { Role } from '@prisma/client'
import { prisma } from "../prisma";
/** @type {import('./data.json').RequestHandler} */
export async function get({ }) {
  const created = await prisma.user.create({ data: { name: 'some name' } });

  const r:Role|undefined = Role.ADMIN;
  console.debug(`Test at ${process.env.VERCEL_GIT_COMMIT_SHA ?? 'develop/preview'}`);
  console.debug(`Using Enum both as values and as a type: ${r}`)

  if (created) {
    return {
      body: { created }
    };
  }
 
  return {
    status: 404
  };
}