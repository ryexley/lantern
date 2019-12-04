import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
// import rings from "./rings.svg"
// import puff from "./puff.svg"
// import infinitProgressCircle from "./infinite-progress-circle.svg"
import { css } from "astroturf"

const styles = css`
  .loadingIndicator {
    align-items: center;
    display: flex;
    height: auto;
    margin: 0;
    transition: all 0.5s;

    &::before {
      background-size: contain;
      border: 1px dashed #eee;
      content: "";
      display: block;
      height: 1.5rem;
      margin-right: 0.5rem;
      text-indent: -625rem;
      width: 1.5rem;
    }

    &[style*="display: none;"] {
      height: 0;
      opacity: 0;
      padding: 0;
      pointer-events: none;
      user-select: none;
      visibility: visible;
    }
  }

  .label {
    animation: pulse 2.5s infinite;
    margin: 0;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.25;
    }

    100% {
      opacity: 1;
    }
  }
`

function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => savedCallback.current()

    if (delay !== null) {
      const id = setInterval(tick, delay)

      return () => clearInterval(id)
    }

    return null
  }, [delay])
}

export const LoadingIndicator = ({ showLabel, label }) => {
  const MAX_DOTS = 3
  const [dotCount, setDotCount] = useState(0)

  const dotHash = {
    0: "",
    1: ".",
    2: "..",
    3: "..."
  }

  const incrementDotCount = () => {
    const reset = (dotCount === MAX_DOTS)

    setDotCount(reset ? 0 : (dotCount + 1))
  }

  useInterval(incrementDotCount, 500)

  return (
    <div className={styles.loadingIndicator}>
      { showLabel ? <span className={styles.label}>{`${label}${dotHash[dotCount]}`}</span> : null }
    </div>
  )
}

LoadingIndicator.propTypes = {
  showLabel: PropTypes.bool,
  label: PropTypes.string
}

LoadingIndicator.defaultProps = {
  showLabel: true,
  label: "Loading"
}
