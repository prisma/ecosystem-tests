// @ts-check
const { test, expect } = require('@jest/globals')
// const { dependencies } = require('./package.json')
const fetch = require('node-fetch').default

jest.setTimeout(30_000)

test('output', async () => {
  const response = await fetch(process.env.DEPLOYMENT_URL + '/function')
  const text = await response.text()

  expect(text).toEqual("yay!")  
})
