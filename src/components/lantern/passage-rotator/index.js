import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { css } from "astroturf"
import { HeadContent } from "#/components/ui/head-content"
import { LoadingIndicator } from "#/components/ui/loading-indicator"
import { BibleService } from "#/services/bible"
import { isNotEmpty } from "#/util"

const styles = css`
  .container {
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

const renderLoadingCollection = () => <LoadingIndicator label="Loading passage collection" />

const renderCollection = collection => (
  <div className={styles.container}>
    <h1>{ collection.name }</h1>
    <p>{ collection.description }</p>
  </div>
)

export const PassageRotator = ({ collectionSlug }) => {
  const bible = new BibleService()

  const [collection, setCollection] = useState({})
  const collectionLoaded = isNotEmpty(collection)

  useEffect(() => {
    const fetchCollection = async () => {
      const collectionResult = await bible.getCollection(collectionSlug)

      setCollection(collectionResult)
    }

    fetchCollection()
  }, [])

  return (
    <>
      <HeadContent title={`Bible Passages (${collection && collection.name})`} />
      { !collectionLoaded ? renderLoadingCollection() : null }
      { collectionLoaded && renderCollection(collection) }
    </>
  )
}

PassageRotator.propTypes = {
  collectionSlug: PropTypes.string
}
