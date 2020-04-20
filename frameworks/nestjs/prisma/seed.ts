import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function main() {
  await client.user.deleteMany({})

  const user1 = await client.user.create({
    data: {
      email: 'lisa@simpson.com',
      firstname: 'Lisa',
      lastname: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
    }
  });
  const user2 = await client.user.create({
    data: {
      email: 'bart@simpson.com',
      firstname: 'Bart',
      lastname: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
    }
  });

  console.log({ user1, user2 });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await client.disconnect();
  });
