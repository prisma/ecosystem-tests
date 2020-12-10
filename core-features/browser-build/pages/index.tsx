import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { BrowserBuild } from '../components/browser-build'

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <BrowserBuild/>
  </div>
)

export default Home

