<template>
  <div ref="parent" :style="finalStyle">
    <div ref="child" :style="wrapperStyle">
      <slot />
    </div>
  </div>
</template>

<script>
// Vue port of react-textfit
// https://github.com/malte-wessel/react-textfit
import VueTypes from "vue-types"

const api = {
  uid: 0,

  innerHeight(el) {
    const style = window.getComputedStyle(el, null)

    return (
      el.clientWidth -
      parseInt(style.getPropertyValue("padding-top", 10)) -
      parseInt(style.getPropertyValue("padding-bottom", 10))
    )
  },

  innerWidth(el) {
    const style = window.getComputedStyle(el, null)

    return (
      el.clientWidth -
      parseInt(style.getPropertyValue("padding-left", 10)) -
      parseInt(style.getPropertyValue("padding-right", 10))
    )
  },

  series(tasks, cb) {
    const results = []
    let current = 0
    let isSync = true

    function done(err) {
      function end() {
        if (cb) {
          cb(err, results)
        }
      }

      if (isSync) {
        process.nextTick(end)
      } else {
        end()
      }
    }

    function each(err, result) {
      results.push(result)
      if (++current >= tasks.length || err) {
        done(err)
      } else {
        tasks[current](each)
      }
    }

    if (tasks.length > 0) {
      tasks[0](each)
    } else {
      done(null)
    }

    isSync = false
  },

  shallowEqual(a, b) {
    if (a === b) {
      return true
    }

    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) {
      return false
    }

    const hasOwn = Object.prototype.hasOwnProperty
    for (let i = 0; i < keysA.length; i++) {
      if (
        !hasOwn.call(b, keysA[i]) ||
        a[keysA[i]] !== b[keysA[i]]
      ) {
        return false
      }
    }

    return true
  },

  throttle(fn, wait) {
    let ctx
    let args
    let rtn
    let timeoutId
    let last = 0

    function call() {
      timeoutId = 0
      last = +new Date()
      rtn = fn.apply(ctx, args)
      ctx = null
      args = null
    }

    return function throttled() {
      ctx = this
      args = arguments
      const delta = new Date() - last
      if (!timeoutId) {
        if (delta >= wait) {
          call()
        } else {
          timeoutId = setTimeout(call, wait - delta)
        }
      }

      return rtn
    }
  },

  uniqueId() {
    return this.uid++
  },

  whilst(test, iterator, callback = () => {}) {
    if (test()) {
      iterator(function next(err, ...args) {
        if (err) {
          callback(err)
        } else if (test.apply(this, args)) {
          iterator(next)
        } else {
          callback(null)
        }
      })
    } else {
      callback(null)
    }
  },

  assertElementFitsHeight(el, height) {
    return (el.scrollHeight - 1) <= height
  },

  assertElementFitsWidth(el, width) {
    return (el.scrollWidth - 1) <= width
  }
}

export default {
  name: "text-fit",
  props: {
    text: VueTypes.string,
    min: VueTypes.number.def(1),
    max: VueTypes.number.def(100),
    mode: VueTypes.oneOf(["single", "multi"]).def("multi"),
    autoResize: VueTypes.bool.def(true),
    forceSingleModeWidth: VueTypes.bool.def(true),
    throttle: VueTypes.number.def(50),
    onReady: VueTypes.func.def(() => {})
  },
  beforeMount() {
    this.handleWindowResize = () => api.throttle(this.handleWindowResize, this.throttle)
  },
  mounted() {
    if (this.autoResize) {
      window.addEventListener("resize", this.handleWindowResize)
    }

    this.process()
  },
  updated() {
    if (!this.ready) {
      return
    }

    // this.process()
  },
  beforeDestroy() {
    if (this.autoResize) {
      window.removeEventListener("resize", this.handleWindowResize)
    }

    this.pid = api.uniqueId()
  },
  data: () => ({
    fontSize: null,
    ready: false
  }),
  computed: {
    finalStyle() {
      return {
        fontSize: `${this.fontSize}px`,
        // lineHeight: "150%" // `${(this.fontSize * 2)}px`
      }
    },
    wrapperStyle() {
      let style = { display: this.ready ? "block" : "inline-block" }

      if (this.mode === "single") {
        style = {
          ...style,
          whiteSpace: "nowrap"
        }
      }

      return style
    }
  },
  methods: {
    process() {
      const wrapper = this.$refs.child
      const originalHeight = api.innerHeight(this.$refs.parent)
      const originalWidth = api.innerWidth(this.$refs.parent)

      if (originalHeight <= 0 || isNaN(originalHeight)) {
        console.warn("Cannot process element without height. Make sure the element is displayed and has a static height.")
        return
      }

      if (originalWidth <= 0 || isNaN(originalWidth)) {
        console.warn("Cannot process element without width. Make sure the element is displayed and has a static width.")
        return
      }

      const pid = api.uniqueId()
      this.pid = pid

      const shouldCancelProcess = () => pid !== this.pid

      const testPrimary = this.mode === "multi"
        ? () => api.assertElementFitsHeight(wrapper, originalHeight)
        : () => api.assertElementFitsWidth(wrapper, originalWidth)

      const testSecondary = this.mode === "multi"
        ? () => api.assertElementFitsWidth(wrapper, originalWidth)
        : () => api.assertElementFitsHeight(wrapper, originalHeight)

      let mid
      let low = this.min
      let high = this.max

      this.ready = false

      api.series([
        // Step 1:
        // Binary search to fit the element's height (multi line) / width (single line)
        stepCallback => api.whilst(
          () => low <= high,
          whilstCallback => {
            this.processStep = "one"
            if (shouldCancelProcess()) {
              return whilstCallback(true)
            }

            mid = parseInt((low + high) / 2, 10)
            this.fontSize = mid
            this.$nextTick().then(() => {
              if (shouldCancelProcess()) {
                return whilstCallback(true)
              }

              if (testPrimary()) {
                low = mid + 1
              } else {
                high = mid - 1
              }

              return whilstCallback()
            })
          },
          stepCallback
        ),
        // Step 2:
        // Binary search to fit the element's width (multi line) / height (single line)
        // If mode is single and forceSingleModeWidth is true, skip this step
        // in order to not fit the elements height and decrease the width
        stepCallback => {
          if (this.mode === "single" && this.forceSingleModeWidth) {
            return stepCallback()
          }

          if (testSecondary()) {
            return stepCallback()
          }

          low = this.min
          high = mid

          return api.whilst(
            () => low < high,
            whilstCallback => {
              if (shouldCancelProcess()) {
                return whilstCallback(true)
              }

              mid = parseInt((low + high) / 2, 10)
              this.fontSize = mid
              this.$nextTick().then(() => {
                if (pid !== this.pid) {
                  return whilstCallback(true)
                }

                if (testSecondary()) {
                  low = mid + 1
                } else {
                  high = mid - 1
                }

                return whilstCallback()
              })
            },
            stepCallback
          )
        },
        // Step 3
        // Limits
        stepCallback => {
          // We break the previous loop without updating mid for the final time,
          // so we do it here:
          mid = Math.min(low, high)

          // Ensure we hit the user-supplied limits
          mid = Math.max(mid, this.min)
          mid = Math.min(mid, this.max)

          // Sanity check
          mid = Math.max(mid, 0)

          if (shouldCancelProcess()) {
            return stepCallback(true)
          }

          this.fontSize = mid
          this.$nextTick().then(() => {
            stepCallback()
          })
        }
      ], err => {
        // err will be true, if another process was triggered
        if (err || shouldCancelProcess()) {
          return
        }

        this.ready = true
        this.$nextTick().then(() => {
          this.onReady(mid)
        })
      })
    }
  }
}
</script>
