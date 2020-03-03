import { PrismaClient } from "@prisma/client";
import { Context, HttpRequest } from "@azure/functions";
import { spawnSync } from "child_process";

const client = new PrismaClient();

async function debug() {
  const cmd = spawnSync(
    "dir D:\\home\\site\\wwwroot\\node_modules\\@prisma\\client\\runtime\\query-engine-windows.exe"
  );
  console.log(
    "dir D:\\home\\site\\wwwroot\\node_modules\\@prisma\\client\\runtime\\"
  );
  console.log("stderr", cmd.stderr);
  console.log("stdout", cmd.stdout);
}

export default async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  await debug();

  await client.user.deleteMany({});

  const id = "12345";

  const createUser = await client.user.create({
    data: {
      id,
      email: "alice@prisma.io",
      name: "Alice"
    }
  });

  const updateUser = await client.user.update({
    where: {
      id: createUser.id
    },
    data: {
      email: "bob@prisma.io",
      name: "Bob"
    }
  });

  const users = await client.user.findOne({
    where: {
      id: createUser.id
    }
  });

  const deleteManyUsers = await client.user.deleteMany({});

  context.res = {
    status: 200,
    body: JSON.stringify({
      createUser,
      updateUser,
      users,
      deleteManyUsers
    })
  };

  context.done();
}
