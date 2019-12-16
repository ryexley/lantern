<template>
  <div class="countdown-timer">
    <svg :height="size" :width="size">
      <path
        fill="none"
        :stroke="trailColor"
        :strokeWidth="strokeWidth"
        :d="getPath()" />
      <path
        fill="none"
        :stroke="progressColor"
        :strokeWidth="strokeWidth"
        :strokeLinecap="strokeLineCap"
        :strokeDasharray="pathTotalLength"
        :strokeDashoffset="strokeDasharray" />
    </svg>
  </div>
</template>

<script>
import VueTypes from "vue-types"
// import { TIME } from "@/enums"

// bit of a wack attempt at porting this to vue
// https://github.com/vydimitrov/react-countdown-circle-timer
export default {
  name: "countdown-timer",
  props: {
    size: VueTypes.number.def(40),
    strokeWidth: VueTypes.number.def(12),
    trailColor: VueTypes.string.def("#ccc"),
    progressColor: VueTypes.string.def("#777"),
    strokeLineCap: VueTypes.oneOf(["round", "square"]).def("round")
  },
  data: () => ({
    pathTotalLength: 0
  }),
  computed: {
    strokeDasharray() {
      // return this.linearEase()
      return 50
    }
  },
  methods: {
    getPath() {
      const halfSize = this.size / 2
      const halfStrokeWidth = this.strokeWidth / 2
      const arcPathCenter = halfSize - halfStrokeWidth
      const arcDiameter = arcPathCenter * 2

      return [
        `m ${halfSize},${halfStrokeWidth}`,
        `a ${arcPathCenter},${arcPathCenter} 0 1,0 0,${arcDiameter}`,
        `a ${arcPathCenter},${arcPathCenter} 0 1,0 0,-${arcDiameter}`
      ].join(" ")
    },
    linearEase({ time, start, goal, duration }) {
      const currentTime = time / duration

      return start + (goal * currentTime)
    }
  }
}
</script>

<style>
  .countdown-timer {
    height: 2.5rem;
    width: 2.5rem;

    & svg {
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
</style>
