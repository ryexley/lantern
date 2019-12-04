/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
import { css } from "astroturf"

import "./style.css"

const styles = css`
  :root {
    --typography--base-font-size: 16px;
    --typography--line-height: 1.6;
    --typography--leading: calc(var(--typography--base-font-size) * var(--typography--line-height));
    --theme--color-base: #9f0;
  }

  * {
    line-height: var(--typography--leading);
    margin-bottom: var(--typography--leading);
  }

  .main {
    margin: 0;
    padding: 1rem;
  }
`

export const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <main className={styles.main}>
      {children}
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
