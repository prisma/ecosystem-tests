import { Prisma } from '@prisma/client';
import React from 'react'
const prettyPrintJson = require('pretty-print-json');

export const BrowserBuild = () => {
  // const shouldThrow = new PrismaClient()
  // @ts-ignore
  const decimal = new Prisma.Decimal(0.213213);
  return (
    <div style={{textAlign: 'left', margin: 'auto', maxWidth: 700, padding: 10}}>
      Decimal Test: {JSON.stringify(decimal.squareRoot())}
      {<div><pre>{JSON.stringify(Prisma, null, 2) }</pre></div>}
    </div>
  )
}
