import React from "react"
import PropTypes from "prop-types"
import { css } from "astroturf"

const styles = css`
  .card {
    border: 1px solid var(--theme--color-border);
    border-radius: 0.5rem;
    display: flex;
    padding: 1rem;
  }
`

export const Card = ({ children }) => (
  <div className={styles.card}>
    { children }
  </div>
)

Card.propTypes = {
  children: PropTypes.node.isRequired
}
