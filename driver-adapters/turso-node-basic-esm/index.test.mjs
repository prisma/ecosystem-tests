// @ts-check
import { test, expect, jest } from '@jest/globals'
import { handler } from './index.mjs'

jest.setTimeout(15_000)

test('prisma client functions normally', async () => {
  await expect(handler()).resolves.not.toThrow()
})
