import React from "react"
import { Link } from "gatsby"
import { Layout } from "#/components/ui/layout"
import { HeadContent } from "#/components/ui/head-content"

const IndexPage = () => (
  <Layout>
    <HeadContent title="Home" />
    <Link to="/lantern">Lantern</Link>
  </Layout>
)

export default IndexPage
