import React from "react"
import { Link } from "gatsby"
import { css } from "astroturf"
import { HeadContent } from "#/components/ui/head-content"

const styles = css`
  .container {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    width: 100vw;
  }
`

export const LanternHome = () => (
  <section className={styles.container}>
    <HeadContent title="Lantern" />
    <h1>Lantern Home</h1>
    <Link to="/lantern/collections">Choose a collection</Link>
  </section>
)
