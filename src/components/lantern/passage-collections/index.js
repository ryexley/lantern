import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { css } from "astroturf"
import { HeadContent } from "#/components/ui/head-content"
import { LoadingIndicator } from "#/components/ui/loading-indicator"
import { List } from "#/components/ui/list"
import { Card } from "#/components/ui/card"
import { BibleService } from "#/services/bible"

const styles = css`
  .collectionsContainer {
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    overflow: hidden;
    width: 100vw;
  }

  .collectionCard {
    width: 18.75rem;

    a {
      display: block;
      text-decoration: none;
      width: 100%;

      p {
        color: var(--theme--color-text);
      }
    }
  }

  .collectionName {
    text-transform: capitalize;
  }
`

const renderCollectionCard = collection => (
  <Card>
    <Link to={`/lantern/passages/${collection.slug}`}>
      <h2 className={styles.collectionName}>{ collection.name }</h2>
      <p>{ collection.description }</p>
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
    <section className={styles.collectionsContainer}>
      <HeadContent title="Choose a Bible Passage Collection" />
      { !biblePassageCollectionsLoaded ? <LoadingIndicator /> : null }
      { biblePassageCollectionsLoaded && renderPassageCollections(biblePassageCollections) }
    </section>
  )
}
