import * as child_process from 'child_process'

describe('20-concurrent', () => {
  jest.setTimeout(900000)

  test('should not fail when running 20 concurrent itx', async () => {
    const list = new Array(20).fill(null)

    await Promise.all(
      list.map((): Promise<void> => {
        return new Promise((resolve, reject) => {
          child_process.exec(`node ${__dirname}/20-concurrent.js`, (error) => {
            if (error) {
              reject(error)
            }

            resolve()
          })
        })
      }),
    )
  })
})
