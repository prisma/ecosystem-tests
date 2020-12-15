import { Prisma, PrismaClient } from '@prisma/client';
import React from 'react'
const test = {...Prisma}
delete test['dmmf'];

export const BrowserBuild = () => {
  const [err, setErr] = React.useState()
  const decimal = new Prisma.Decimal(0.213213);
  React.useEffect(() => {
    try {
      const client = new PrismaClient()
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
      <br/>
      <br/>
      <strong>Browser Test:</strong>
      {<div><pre>{JSON.stringify(test, null, 2) }</pre></div>}
    </div>
  )
}
