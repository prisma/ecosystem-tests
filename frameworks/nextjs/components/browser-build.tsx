import { Prisma } from '@prisma/client';
import React from 'react'
export const BrowserBuild = () => {
  // const shouldThrow = new PrismaClient()
  // @ts-ignore
  const decimal = new Prisma.Decimal(0.213213);
  return (
    <div>
      {JSON.stringify(decimal)}
      {JSON.stringify(Prisma.UserDistinctFieldEnum)}
    </div>
  )
}
