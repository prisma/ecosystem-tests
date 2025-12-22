// @ts-check
import { test, expect, vi } from 'vitest'
import { handler } from './index.mjs'

vi.setConfig({ testTimeout: 15_000 })

test('prisma client functions normally', async () => {
  await expect(handler()).resolves.not.toThrow()
})
