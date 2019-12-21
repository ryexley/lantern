<template>
  <div ref="fitTextWrapper" class="fit-text">
    <slot />
  </div>
</template>

<script>
import VueTypes from "vue-types"
import fitty from "fitty"

export default {
  name: "fit-text",
  props: {
    minSize: VueTypes.number.def(40),
    maxSize: VueTypes.number.def(150),
    multiLine: VueTypes.bool.def(true)
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeFitty()
    })
  },
  data() {
    return {
      fittyOptions: {
        minSize: this.minSize,
        maxSize: this.maxSize,
        multiLine: this.multiLine
      }
    }
  },
  methods: {
    initializeFitty() {
      this.fittyInstance = fitty(this.$refs.fitTextWrapper, this.fittyOptions)
    }
  }
}
</script>

<style>
  .fit-text {
    display: inline-block;
    white-space: nowrap;
  }
</style>
