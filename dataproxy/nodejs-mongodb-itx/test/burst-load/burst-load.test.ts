import * as child_process from 'child_process'
import util from 'util'
import { config } from '../../config'
const sleep = util.promisify(setTimeout)

const { bursts, children, backoff } = config['burst-load']

describe('burst-load', () => {
  jest.setTimeout(900_000_000)

  test(
    `should not fail when burst loading ${children} itx, ${bursts} times, with ${backoff} ms backoff`,
    async () => {
      async function* burstGenerator() {
        for (let i = 0; i < bursts; i++) {
          yield (async () => {
            const list = new Array(children).fill(null)

            await Promise.all(
              list.map((): Promise<void> => {
                return new Promise((resolve, reject) => {
                  child_process.exec(`node ${__dirname}/burst-load.js`, (error, stdout, stderr) => {
                    console.log(stdout)
                    console.error(stderr)

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
        await sleep(backoff)
      }
    },
    config.globalTimeout,
  )
})
