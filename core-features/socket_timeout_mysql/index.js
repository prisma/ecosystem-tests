const { PrismaClient } = require('@prisma/client')


async function main() {
  const start = Date.now()

  process.env.OS_BASE_MYSQL_URL="mysql://prisma:qd58rcCywPRS4Stk@postgres-e2e-ts.cg7tbvsdqlrs.eu-central-1.rds.amazonaws.com:5432/platform-firebase-functions?schema=public"
  console.log('OS_BASE_MYSQL_URL', process.env.OS_BASE_MYSQL_URL)
  
  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.OS_BASE_MYSQL_URL + '&socket_timeout=5'
        }
      }
    })
    await prisma.$executeRaw('select sleep(120);')
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

