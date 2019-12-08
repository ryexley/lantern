import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { css } from "astroturf"
import { HeadContent } from "#/components/ui/head-content"
import { LoadingIndicator } from "#/components/ui/loading-indicator"
import { BibleService } from "#/services/bible"
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
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100vw;
  }
`

const renderLoadingCollection = () => <LoadingIndicator label="loading passage collection" />

const renderCollection = collection => (
  <>
    <h1>{ collection.name }</h1>
    <p>{ collection.description }</p>
  </>
)

const renderError = () => (
  <h2>Oops. Something went wrong, sorry about that.</h2>
)

export const PassageRotator = ({ collectionSlug }) => {
  const dispatch = useDispatch()
  const bible = new BibleService()

  const {
    loading: loadingCollection,
    data: passageCollection,
    error
  } = useSelector(state => state.bible.passageCollection)

  useEffect(() => {
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

    fetchCollection()
  }, [])

  return (
    <section className={styles.passageRotatorContainer}>
      <HeadContent title={`Bible Passages (${passageCollection && passageCollection.name})`} />
      { loadingCollection ? renderLoadingCollection() : null }
      { !loadingCollection && renderCollection(passageCollection) }
      { isNotEmpty(error) && renderError() }
    </section>
  )
}

PassageRotator.propTypes = {
  collectionSlug: PropTypes.string
}
