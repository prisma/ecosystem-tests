import * as child_process from 'child_process'
import { config } from '../../config'

const amount = config.concurrent.amount

describe('concurrent', () => {
  jest.setTimeout(900000)

  test(`should not fail when running ${amount} concurrent itx`, async () => {
    const list = new Array(amount).fill(null)

    await Promise.all(
      list.map((): Promise<void> => {
        return new Promise((resolve, reject) => {
          child_process.exec(`node ${__dirname}/concurrent.js`, (error) => {
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
