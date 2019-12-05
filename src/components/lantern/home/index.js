import React from "react"
import { Link } from "gatsby"
import { HeadContent } from "#/components/ui/head-content"

export const LanternHome = () => (
  <>
    <HeadContent title="Lantern" />
    <h1>Lantern Home</h1>
    <Link to="/lantern/collections">Choose a collection</Link>
  </>
)
