import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const WelcomePage = () => {
  return (
    <>
      <MetaTags title="Welcome" description="Welcome page" />

      <h1>WelcomePage</h1>
      <p>
        Find me in <code>./web/src/pages/WelcomePage/WelcomePage.jsx</code>
      </p>
      <p>
        My default route is named <code>welcome</code>, link to me with `
        <Link to={routes.welcome()}>Welcome</Link>`
      </p>
    </>
  )
}

export default WelcomePage
