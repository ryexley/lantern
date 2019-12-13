import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { css } from "astroturf"
import { LoadingIndicator } from "#/components/ui/loading-indicator"
import { BibleService } from "#/services/bible"
import { isNotEmpty } from "#/util"
import {
  setCurrentPassage,
  fetchCurrentPassageFailed
} from "#/store/actions/bible"

const styles = css`
  .passage {
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    padding: 1rem;
  }
`

const renderCurrentPassageLoading = () => <LoadingIndicator label="loading current passage" />

const renderCurrentPassage = ({ passageText }) => (
  <h2>{passageText}</h2>
)

const renderError = () => (
  <h3>Oops. Something went wrong.</h3>
)

export const PassageRotator = () => {
  const bible = new BibleService()
  const dispatch = useDispatch()

  const fetchPassage = async reference => {
    try {
      const passage = await bible.getPassage(reference)

      console.log({ passage })

      dispatch(setCurrentPassage(passage))
    } catch (err) {
      dispatch(fetchCurrentPassageFailed(err))
    }
  }

  const { currentPassage } = useSelector(state => state.bible.passageRotation)
  const {
    reference,
    loading: currentPassageLoading,
    data: currentPassageData,
    error: currentPassageError
  } = currentPassage

  useEffect(() => {
    if (isNotEmpty(currentPassage)) {
      const { slug: currentPassageReference } = reference

      console.log(`fetching passage with reference ${currentPassageReference}`)

      fetchPassage(currentPassageReference)
    }
  }, [])

  return (
    <article className={styles.passage}>
      { currentPassageLoading ? renderCurrentPassageLoading() : null }
      { currentPassageLoading === false && renderCurrentPassage(currentPassageData) }
      { currentPassageError && renderError() }
    </article>
  )
}
