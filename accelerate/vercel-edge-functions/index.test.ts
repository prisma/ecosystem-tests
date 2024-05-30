/// <reference types="@types/jest" />

import fetch from 'node-fetch'

describe('use data proxy', () => {
  test('fetch response', async () => {
    const vercelEdgeFunctionsDeployment = process.env.DEPLOYMENT_URL!
    console.debug(vercelEdgeFunctionsDeployment)

    console.debug(new Date(), 'Start await fetch(vercelEdgeFunctionsDeployment)')
    console.time('fetchTook')

    const response = await fetch(vercelEdgeFunctionsDeployment, {
      headers: {
        'user-agent': 'ecosystem-tests',
      },
    })

    console.timeEnd('fetchTook')
    console.debug(new Date(), 'End await fetch(vercelEdgeFunctionsDeployment)')

    const bodyAsText = await response.text()
    console.debug(bodyAsText)

    const jsonData = JSON.parse(bodyAsText)
    expect(jsonData).toMatchInlineSnapshot(`
{
  "data": [
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
  ],
}
`)
  }, 30000)
})
