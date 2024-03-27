import { main } from './src/index'

/// <reference types="@types/jest" />

describe('Pulse', () => {
  test('create a subscription, send queries and listen to events', async () => {
    const result = await main()
    console.debug({ result })

    expect(result.create).toMatchObject({
      action: 'create',
      created: {
        email: expect.any(String),
        name: null,
        user_id: expect.any(Number),
      },
      id: expect.any(String),
      modelName: 'User',
    })
    expect(result.update).toMatchObject({
      action: 'update',
      after: {
        email: expect.any(String),
        name: 'Alice',
        user_id: expect.any(Number),
      },
      before: null,
      id: expect.any(String),
      modelName: 'User',
    })
    expect(result.delete).toMatchObject({
      action: 'delete',
      deleted: {
        user_id: expect.any(Number),
      },
      id: expect.any(String),
      modelName: 'User',
    })
  }, 30000)
})
