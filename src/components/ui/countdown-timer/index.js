import React, { createRef, useState } from "react"
import PropTypes from "prop-types"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { css } from "astroturf"
import { useInterval } from "#/hooks/use-interval"

const styles = css`
`

export const CountdownTimer = ({
  active,
  duration,
  onComplete,
  restartDelay,
  size,
  strokeWidth,
  trailColor,
  colors
}) => {
  const foo = (typeof colors === "string") ? [[colors]] : colors
  const onTimerComplete = () => {
    if (onComplete) {
      onComplete()
    }

    return [true, restartDelay]
  }

  return (
    <div style={{ height: `${size}px`, width: `${size}px` }}>
      <CountdownCircleTimer
        isPlaying={active}
        durationSeconds={duration}
        onComplete={onTimerComplete}
        size={size}
        strokeWidth={strokeWidth}
        trailColor={trailColor}
        colors={foo} />
    </div>
  )
}

CountdownTimer.propTypes = {
  active: PropTypes.bool,
  duration: PropTypes.number,
  onComplete: PropTypes.func,
  restartDelay: PropTypes.number,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  trailColor: PropTypes.string,
  colors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.array)
  ])
}

CountdownTimer.defaultProps = {
  active: true,
  duration: 5,
  restartDelay: 500,
  trailColor: "#eee",
  colors: [["#ccc"]],
  size: 32,
  strokeWidth: 3
}
