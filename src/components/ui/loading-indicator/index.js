import React, { useState } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useInterval } from "#/hooks/use-interval"
// import rings from "./rings.svg"
// import puff from "./puff.svg"
// import infinitProgressCircle from "./infinite-progress-circle.svg"
import { css } from "astroturf"

const styles = css`
  .loadingIndicator {
    align-items: center;
    cursor: default;
    display: flex;
    height: auto;
    margin: 0;
    transition: all 0.5s;
    user-select: none;

    &::before {
      background-image: url(data:image/svg+xml;base64,PCEtLSBCeSBTYW0gSGVyYmVydCAoQHNoZXJiKSwgZm9yIGV2ZXJ5b25lLiBNb3JlIEAgaHR0cDovL2dvby5nbC83QUp6YkwgLS0+Cjxzdmcgd2lkdGg9IjQ1IiBoZWlnaHQ9IjQ1IiB2aWV3Qm94PSIwIDAgNDUgNDUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiPgogIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgIDxjaXJjbGUgY3g9IjIyIiBjeT0iMjIiIHI9IjYiIHN0cm9rZS1vcGFjaXR5PSIwIj4KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIKICAgICAgICBiZWdpbj0iMS41cyIgZHVyPSIzcyIKICAgICAgICB2YWx1ZXM9IjY7MjIiCiAgICAgICAgY2FsY01vZGU9ImxpbmVhciIKICAgICAgICByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLW9wYWNpdHkiCiAgICAgICAgYmVnaW49IjEuNXMiIGR1cj0iM3MiCiAgICAgICAgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJsaW5lYXIiCiAgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS13aWR0aCIKICAgICAgICBiZWdpbj0iMS41cyIgZHVyPSIzcyIKICAgICAgICB2YWx1ZXM9IjI7MCIgY2FsY01vZGU9ImxpbmVhciIKICAgICAgICByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICAgIDwvY2lyY2xlPgogICAgPGNpcmNsZSBjeD0iMjIiIGN5PSIyMiIgcj0iNiIgc3Ryb2tlLW9wYWNpdHk9IjAiPgogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIgogICAgICAgIGJlZ2luPSIzcyIgZHVyPSIzcyIKICAgICAgICB2YWx1ZXM9IjY7MjIiCiAgICAgICAgY2FsY01vZGU9ImxpbmVhciIKICAgICAgICByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLW9wYWNpdHkiCiAgICAgICAgYmVnaW49IjNzIiBkdXI9IjNzIgogICAgICAgIHZhbHVlcz0iMTswIiBjYWxjTW9kZT0ibGluZWFyIgogICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2Utd2lkdGgiCiAgICAgICAgYmVnaW49IjNzIiBkdXI9IjNzIgogICAgICAgIHZhbHVlcz0iMjswIiBjYWxjTW9kZT0ibGluZWFyIgogICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgPC9jaXJjbGU+CiAgICA8Y2lyY2xlIGN4PSIyMiIgY3k9IjIyIiByPSI4Ij4KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIKICAgICAgICBiZWdpbj0iMHMiIGR1cj0iMS41cyIKICAgICAgICB2YWx1ZXM9IjY7MTsyOzM7NDs1OzYiCiAgICAgICAgY2FsY01vZGU9ImxpbmVhciIKICAgICAgICByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICAgIDwvY2lyY2xlPgogIDwvZz4KPC9zdmc+Cg==);
      background-size: contain;
      /* border: 1px dashed #eee; */
      content: "";
      display: block;
      /* 👇 #c06 converted with https://codepen.io/sosuke/pen/Pjoqqp */
      filter: invert(20%) sepia(78%) saturate(5046%) hue-rotate(318deg) brightness(76%) contrast(114%);
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

  .dots {
    display: inline-block;
    transition: opacity 500ms ease-in-out, visibility 500ms ease-in-out;
  }

  .label {
    margin: 0;
    text-transform: capitalize;
  }

  .visible {
    opacity: 1;
    visibility: visible;
  }

  .hidden {
    opacity: 0;
    visibility: hidden;
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

export const LoadingIndicator = ({ showLabel, label }) => {
  const MAX_DOTS = 3
  const [dotCount, setDotCount] = useState(0)

  /* eslint-disable react/display-name */
  const dotHash = {
    0: () => (
      <span className={classNames(styles.dots, styles.hidden)}>...</span>
    ),
    1: () => (
      <span className={styles.dots}>
        <span className={styles.visible}>.</span>
        <span className={styles.hidden}>..</span>
      </span>
    ),
    2: () => (
      <span className={styles.dots}>
        <span className={styles.visible}>..</span>
        <span className={styles.hidden}>.</span>
      </span>
    ),
    3: () => (
      <span className={classNames(styles.dots, styles.visible)}>...</span>
    )
  }
  /* eslint-enable react/display-name */

  const renderDots = () => {
    const dots = dotHash[dotCount]

    return dots()
  }

  const incrementDotCount = () => {
    const reset = (dotCount === MAX_DOTS)

    setDotCount(reset ? 0 : (dotCount + 1))
  }

  useInterval(incrementDotCount, 500)

  return (
    <div className={styles.loadingIndicator}>
      { showLabel ? <span className={styles.label}>{label}{renderDots()}</span> : null }
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
