/// <reference types="@types/jest" />

import fetch from 'node-fetch'

describe('use data proxy', () => {
  it('fetch response', async () => {
    const response = await fetch(process.env.DEPLOYMENT_URL!)
    const jsonData = await response.json()

    expect(jsonData).toMatchInlineSnapshot(`
Object {
  "data": Array [
    Object {
      "email": "Eleanore_Feest@yahoo.com",
      "name": "Autumn",
      "user_id": 1,
    },
    Object {
      "email": "Ezra.Borer@gmail.com",
      "name": "Marguerite",
      "user_id": 2,
    },
    Object {
      "email": "Dustin.Erdman31@gmail.com",
      "name": "Jana",
      "user_id": 3,
    },
    Object {
      "email": "Merle3@gmail.com",
      "name": "Pink",
      "user_id": 4,
    },
    Object {
      "email": "Fredrick.Howe@yahoo.com",
      "name": "Oren",
      "user_id": 5,
    },
    Object {
      "email": "Conrad_Lowe@hotmail.com",
      "name": "Sigmund",
      "user_id": 6,
    },
    Object {
      "email": "Nicola_Hessel10@hotmail.com",
      "name": "Toy",
      "user_id": 7,
    },
    Object {
      "email": "Fredrick_Conroy76@hotmail.com",
      "name": "Brooklyn",
      "user_id": 8,
    },
    Object {
      "email": "Norris40@hotmail.com",
      "name": "Cassandre",
      "user_id": 9,
    },
    Object {
      "email": "Osborne96@gmail.com",
      "name": "Jazmyne",
      "user_id": 10,
    },
  ],
}
`)
  })
})
