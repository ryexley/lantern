import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { css } from "astroturf"
import { HeadContent } from "#/components/ui/head-content"
import { LoadingIndicator } from "#/components/ui/loading-indicator"
import { BibleService } from "#/services/bible"
import { PassageRotator } from "#/components/lantern/passage-rotator"
import { isNotEmpty } from "#/util"
import {
  beginFetchCollection,
  setCollection,
  fetchCollectionFailed,
  initPassageRotation
} from "#/store/actions/bible"

const styles = css`
  .passageRotatorContainer {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    width: 100vw;
  }

  .collectionHeader {
    padding: 1rem;
    text-transform: capitalize;
    width: 100%;

    h1 {
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
    }
  }

  .currentPassage {}
`

const renderLoadingCollection = () => <LoadingIndicator label="loading passage collection" />

const renderCollection = collection => (
  <header className={styles.collectionHeader}>
    <h1>{ collection.name }</h1>
    <p>{ collection.description }</p>
  </header>
)

const renderPassageRotator = () => <PassageRotator />

const renderError = () => (
  <h2>Oops. Something went wrong, sorry about that.</h2>
)

export const PassageCollection = ({ collectionSlug }) => {
  const dispatch = useDispatch()
  const bible = new BibleService()

  const {
    loading: loadingCollection,
    data: passageCollection,
    error
  } = useSelector(state => state.bible.passageCollection)

  const fetchCollection = async () => {
    try {
      dispatch(beginFetchCollection())
      const collection = await bible.getCollection(collectionSlug)
      const { references } = collection
      const passages = references.map(reference => ({
        reference,
        loading: true,
        data: null,
        error: null
      }))

      dispatch(setCollection(collection))
      dispatch(initPassageRotation(passages))
    } catch (err) {
      dispatch(fetchCollectionFailed(err))
    }

    const collectionResult = await bible.getCollection(collectionSlug)

    setCollection(collectionResult)
  }

  useEffect(() => {
    fetchCollection()
  }, [])

  return (
    <section className={styles.passageRotatorContainer}>
      <HeadContent title={`Bible Passages (${passageCollection && passageCollection.name})`} />
      { loadingCollection ? renderLoadingCollection() : null }
      { !loadingCollection && renderCollection(passageCollection) }
      { !loadingCollection && renderPassageRotator() }
      { isNotEmpty(error) && renderError() }
    </section>
  )
}

PassageCollection.propTypes = {
  collectionSlug: PropTypes.string
}
