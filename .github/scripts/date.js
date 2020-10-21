async function run() {
  console.log(`START_TIME`, process.env.START_TIME)
}

run().catch((err) => {
  throw err
})
