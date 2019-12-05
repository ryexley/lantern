import React from "react"
import PropTypes from "prop-types"

export const PassageRotator = ({ collectionSlug }) => (
  <h1>Passage Rotator: { collectionSlug }</h1>
)

PassageRotator.propTypes = {
  collectionSlug: PropTypes.string
}
