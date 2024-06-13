export default defineEventHandler(async (event) => {
  // access Cloudflare's bindings
  const { cloudflare } = event.context

  /**
   * Set up the Cloudflare D1 client
   */

  const d1 = cloudflare.env.D1_DATABASE

  /**
   * Query the database
   */

  const regResult = await d1.prepare('SELECT 1').run()
  return { regResult }
})
