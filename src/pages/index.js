import React, { useState, useEffect } from "react"
// import { Link } from "gatsby"
import { Layout } from "#/components/layout"
import { HeadContent } from "#/components/head-content"
import { LoadingIndicator } from "#/components/loading-indicator"
import { BibleService } from "#/services/bible"

const renderBiblePassageCollections = collections => (
  <ul>
    { collections.map(collection => (
      <li key={collection.id}>{collection.name} ({collection.slug})</li>
    ))}
  </ul>
)

const IndexPage = () => {
  const bible = new BibleService()

  const [biblePassageCollections, setBiblePassageCollections] = useState([])
  const biblePassageCollectionsLoaded = biblePassageCollections.length > 0

  useEffect(() => {
    const fetchBiblePassageCollections = async () => {
      const collections = await bible.getCollections()

      setBiblePassageCollections(collections)
    }

    fetchBiblePassageCollections()
  }, [])

  return (
    <Layout>
      <HeadContent title="Home" />
      <div>
        { !biblePassageCollectionsLoaded ? <LoadingIndicator /> : null }
        { biblePassageCollectionsLoaded ? renderBiblePassageCollections(biblePassageCollections) : null }
      </div>
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  )
}

export default IndexPage
