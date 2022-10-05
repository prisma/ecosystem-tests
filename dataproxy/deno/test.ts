import { describe, it } from "https://deno.land/std@0.158.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.158.0/testing/asserts.ts";
import { getUsers } from "./src/index.ts";

describe("use data proxy", () => {
  it("fetches response", async () => {
    const users = await getUsers();
    assertEquals(users, [
      {
        "email": "Eleanore_Feest@yahoo.com",
        "name": "Autumn",
        "user_id": 1,
      },
      [
        {
          "email": "Eleanore_Feest@yahoo.com",
          "name": "Autumn",
          "user_id": 1,
        },
        {
          "email": "Ezra.Borer@gmail.com",
          "name": "Marguerite",
          "user_id": 2,
        },
        {
          "email": "Dustin.Erdman31@gmail.com",
          "name": "Jana",
          "user_id": 3,
        },
        {
          "email": "Merle3@gmail.com",
          "name": "Pink",
          "user_id": 4,
        },
        {
          "email": "Fredrick.Howe@yahoo.com",
          "name": "Oren",
          "user_id": 5,
        },
        {
          "email": "Conrad_Lowe@hotmail.com",
          "name": "Sigmund",
          "user_id": 6,
        },
        {
          "email": "Nicola_Hessel10@hotmail.com",
          "name": "Toy",
          "user_id": 7,
        },
        {
          "email": "Fredrick_Conroy76@hotmail.com",
          "name": "Brooklyn",
          "user_id": 8,
        },
        {
          "email": "Norris40@hotmail.com",
          "name": "Cassandre",
          "user_id": 9,
        },
        {
          "email": "Osborne96@gmail.com",
          "name": "Jazmyne",
          "user_id": 10,
        },
      ],
    ]);
  });
});
