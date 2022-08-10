import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Nav from '../components/nav'
import { PrismaClient } from '@prisma/client'

export async function getStaticProps() {
  const client = new PrismaClient()

  await client.user.deleteMany({})

  await client.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })

  const users = await client.user.findMany()

  const files = 'TODO'

  return {
    props: {
      users: users,
      files: files,
    },
    revalidate: 5,
  }
}

const Home: NextPage<GetProps<typeof getStaticProps>> = (props) => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <div className="hero">
      <h1 className="title">Welcome to Next.js!</h1>
      <div className="description">
        {props.users.map((u) => (
          <div key={u.id}>
            Name: {u.name}
            Age: {u.age}
          </div>
        ))}
        To get started, edit <code>pages/index.js</code> and save to reload.
      </div>

      <div className="row">
        <a href="https://nextjs.org/docs" className="card">
          <h3>Documentation &rarr;</h3>
          <p>Learn more about Next.js in the documentation.</p>
        </a>
        <a href="https://nextjs.org/learn" className="card">
          <h3>Next.js Learn &rarr;</h3>
          <p>Learn about Next.js by following an interactive tutorial!</p>
        </a>
        <a href="https://github.com/zeit/next.js/tree/master/examples" className="card">
          <h3>Examples &rarr;</h3>
          <p>Find other example boilerplates on the Next.js GitHub.</p>
        </a>
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
)

export default Home

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
type GetProps<T extends (...args: any) => any> = ThenArg<ReturnType<T>> extends { props: infer U } ? U : never
