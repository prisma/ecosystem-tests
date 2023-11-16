// @ts-check
import { test, expect, jest } from '@jest/globals'
import { handler } from './index.mjs'

test('prisma client functions normally', async () => {
  await expect(handler()).resolves.not.toThrow()
})
