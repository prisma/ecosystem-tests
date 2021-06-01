const { PrismaClient } = require('@prisma/client')


async function main() {
  const start = Date.now()
  
  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: "file:.does-not-exist.db" + '&socket_timeout=5'
        }
      }
    })
    const res = await prisma.$executeRaw('select sqlite3_sleep(1000);')
    console.log({ res })
  } catch (error) {
    console.log(error)
  }

  const millis = Date.now() - start
  console.log(`ms elapsed = ${millis}`)
}

main()
  .then((_) => {})
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    console.log('done')
  })

