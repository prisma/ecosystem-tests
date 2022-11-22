import * as child_process from 'child_process'
import util from 'util'
const sleep = util.promisify(setTimeout)

describe('burst-load', () => {
  jest.setTimeout(900_000_000)

  test('should not fail when burst loading 20 itx, 20 times, with 1 second backoff', async () => {
    const rounds = 20

    async function* burstGenerator() {
      let i = 0

      while (i < rounds) {
        i++

        yield (async () => {
          const list = new Array(20).fill(null)

          await Promise.all(
            list.map((): Promise<void> => {
              return new Promise((resolve, reject) => {
                child_process.exec(`node ${__dirname}/burst-load.js`, (error) => {
                  if (error) {
                    reject(error)
                  }

                  resolve()
                })
              })
            }),
          )
        })()
      }
    }

    for await (const _round of burstGenerator()) {
      await sleep(1000)
    }
  }, 900_000_000)
})
