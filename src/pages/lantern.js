import React from "react"
import { Router } from "@reach/router"
import { Layout } from "#/components/ui/layout"
import { LanternHome } from "#/components/lantern/home"
import { PassageCollectionList } from "#/components/lantern/passage-collection-list"
import { PassageCollection } from "#/components/lantern/passage-collection"

const Lantern = () => (
  <Layout>
    <Router>
      <PassageCollectionList path="/lantern/collections" />
      <PassageCollection path="/lantern/passages/:collectionSlug" />
      <LanternHome path="/lantern" />
    </Router>
  </Layout>
)

export default Lantern
