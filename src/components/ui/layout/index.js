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
    --typography--base-font-family: Baskervville, serif;
    --typography--alt-font-family: Raleway, sans-serif;
    --typography--base-font-size: 16px;
    --typography--line-height: 1.6;
    --typography--leading: calc(var(--typography--base-font-size) * var(--typography--line-height));
    --theme--color-border: #eee;
    --theme--color-link: #c06;
    --theme--color-link--hover: #f30;
    --theme--color-text: #444;
  }

  * {
    line-height: var(--typography--leading);
  }

  body {
    color: var(--theme--color-text);
    font-family: var(--typography--base-font-family);
  }

  h1, h2, h3, h4 {
    font-family: var(--typography--base-font-family);
  }

  a {
    color: var(--theme--color-link);
    transition: color 250ms ease-in-out;

    &:hover {
      color: var(--theme--color-link--hover);
    }
  }

  .main {
    display: flex;
    height: 100vh;
    margin: 0;
    padding: 0;
    width: 100vw;

    > div {
      margin: 0;
    }
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
