import { render } from '@redwoodjs/testing/web'

import WelcomePage from './WelcomePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WelcomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WelcomePage />)
    }).not.toThrow()
  })
})
