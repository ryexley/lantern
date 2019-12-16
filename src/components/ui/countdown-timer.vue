<template>
  <div class="countdown-timer">
    <svg>
      <circle :style="circleStyle" r="18" cx="20" cy="20" />
    </svg>
  </div>
</template>

<script>
import { TIME } from "@/enums"

export default {
  name: "countdown-timer",
  props: {
    time: {
      type: Number,
      required: true
    }
  },
  mounted() {
    let countdown = this.time

    this.timerInterval = setInterval(() => {
      countdown = --countdown
      if (countdown <= 0) {
        clearInterval(this.timerInterval)

        this.$emit("timerComplete")
      }
    }, TIME.ONE_SECOND)
  },
  destroyed() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
    }
  },
  data: () => ({
    timerInterval: null
  }),
  computed: {
    circleStyle() {
      return { animationDuration: `${this.time}s` }
    }
  }
}
</script>

<style>
  .countdown-timer {
    position: relative;
    margin: 1.25rem auto;
    height: 2.5rem;
    text-align: center;
    width: 2.5rem;

    & svg {
      height: 2.5rem;
      position: absolute;
      top: 0;
      right: 0;
      transform: rotateY(-180deg) rotateZ(-90deg);
      width: 2.5rem;

      & circle {
        stroke-dasharray: 113px;
        stroke-dashoffset: 0px;
        stroke-linecap: round;
        stroke-width: 4px;
        stroke: #777;
        fill: none;
        animation: countdown linear forwards;
      }
    }
  }

  @keyframes countdown {
    from {
      stroke-dashoffset: 0px;
    }

    to {
      stroke-dashoffset: 113px;
    }
  }
</style>
