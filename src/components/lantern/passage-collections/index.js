import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "gatsby"
import { css } from "astroturf"
import { HeadContent } from "#/components/ui/head-content"
import { LoadingIndicator } from "#/components/ui/loading-indicator"
import { List } from "#/components/ui/list"
import { Card } from "#/components/ui/card"
import { BibleService } from "#/services/bible"
import { isNotEmpty } from "#/util"
import {
  beginFetchCollectionList,
  setCollectionList,
  fetchCollectionListFailed
} from "#/store/actions/bible"

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

const renderLoading = () => <LoadingIndicator label="Loading Collections" />

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

const renderError = () => (
  <h2>Oops. Something went wrong, sorry about that.</h2>
)

export const PassageCollections = () => {
  const dispatch = useDispatch()
  const bible = new BibleService()

  const {
    loading,
    data: passageCollections,
    error
  } = useSelector(state => state.bible.passageCollections)

  useEffect(() => {
    const fetchBiblePassageCollections = async () => {
      try {
        dispatch(beginFetchCollectionList())
        const collections = await bible.getCollections()

        dispatch(setCollectionList(collections))
      } catch (err) {
        dispatch(fetchCollectionListFailed(err))
      }
    }

    fetchBiblePassageCollections()
  }, [])

  return (
    <section className={styles.collectionsContainer}>
      <HeadContent title="Choose a Bible Passage Collection" />
      { loading ? renderLoading() : null }
      { !loading && renderPassageCollections(passageCollections) }
      { isNotEmpty(error) && renderError() }
    </section>
  )
}
