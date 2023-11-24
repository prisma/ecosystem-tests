// @ts-check
export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.status(200).end('Hello from Next.js!')
}
