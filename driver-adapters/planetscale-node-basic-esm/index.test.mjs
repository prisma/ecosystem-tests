// @ts-check
import { test, expect } from 'vitest'
import { handler } from './index.mjs'

test('prisma client functions normally', async () => {
  await expect(handler()).resolves.not.toThrow()
})
