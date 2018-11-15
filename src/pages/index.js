import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import FetchingExample from '../containers/FetchingExample'
import Todo from '../containers/Todo'
import SignOut from '../containers/SignOut'

const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby Firebase Starter.</p>
    <p>Now go build something great with gatsby + firebase.</p>
    <p>
      See example data fetcehed from firebase: in{' '}
      <code>FetchingExample.js</code>
    </p>
    <FetchingExample />
    <Todo />
    <Link to="/page-2/">Go to page 2</Link>
    <SignOut />
  </Layout>
)

export default IndexPage
