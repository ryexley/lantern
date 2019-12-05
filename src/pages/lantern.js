import React from "react"
import { Router } from "@reach/router"
import { Layout } from "#/components/ui/layout"
import { LanternHome } from "#/components/lantern/home"
import { PassageCollections } from "#/components/lantern/passage-collections"
import { PassageRotator } from "#/components/lantern/passage-rotator"

const Lantern = () => (
  <Layout>
    <Router>
      <PassageCollections path="/lantern/collections" />
      <PassageRotator path="/lantern/passages/:collectionSlug" />
      <LanternHome path="/lantern" />
    </Router>
  </Layout>
)

export default Lantern
