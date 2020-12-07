import * as Prisma from '@prisma/client';
import React from 'react'

export const BrowserBuild = () => {
  const [err, setErr] = React.useState()
  const decimal = new Prisma.Prisma.Decimal(0.213213);
  React.useEffect(() => {
    try {
      const client = new Prisma.PrismaClient()
    } catch (err) {
      console.log(err);
      setErr(err.message)
    }
  }, [])
  return (
    <div style={{textAlign: 'left', margin: 'auto', maxWidth: 700, padding: 10}}>
      <h2>Prisma Browser Build Test</h2>
      <strong>Error Test:</strong> {err}
      <br/>
      <br/>
      <strong>Decimal Test:</strong> {JSON.stringify(decimal.squareRoot())}
      <strong>Browser Test:</strong>
      {<div><pre>{JSON.stringify(Prisma, null, 2) }</pre></div>}
    </div>
  )
}
