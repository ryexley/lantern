import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { css } from "astroturf"
import { HeadContent } from "#/components/ui/head-content"
import { LoadingIndicator } from "#/components/ui/loading-indicator"
import { List } from "#/components/ui/list"
import { Card } from "#/components/ui/card"
import { BibleService } from "#/services/bible"

const styles = css`
  .collectionCard {}
`

const renderCollectionCard = collection => (
  <Card>
    <Link to={`/lantern/passages/${collection.slug}`}>
      { collection.name }
    </Link>
  </Card>
)

const renderPassageCollections = passageCollections => (
  <List
    items={passageCollections}
    renderItem={renderCollectionCard}
    itemClass={styles.collectionCard} />
)

export const PassageCollections = () => {
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
    <>
      <HeadContent title="Home" />
      { !biblePassageCollectionsLoaded ? <LoadingIndicator /> : null }
      { biblePassageCollectionsLoaded && renderPassageCollections(biblePassageCollections) }
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </>
  )
}
