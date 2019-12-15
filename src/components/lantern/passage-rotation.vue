<template>
  <article class="passage-rotator">
    <loading-indicator
      v-show="!currentPassageLoaded"
      :labelKey="'components.lantern.passage-rotation.PASSAGE_LOADING_TEXT'" />
    <div class="passage-text">{{ currentPassageText }}</div>
  </article>
</template>

<script>
import LoadingIndicator from "@/components/ui/loading-indicator"

// TODO: create a "Fit Text" component, like the one in this example:
// https://codesandbox.io/s/vwjlp5pj5?from-embed

export default {
  name: "passage-rotation",
  components: {
    LoadingIndicator
  },
  props: {
    passageRotation: {
      type: Object,
      required: true
    }
  },
  created() {
    if (!this.currentPassageLoaded) {
      this.loadCurrentPassage()
    }
  },
  computed: {
    currentPassage() {
      const { currentPassage } = this.passageRotation

      return currentPassage
    },
    currentPassageLoaded() {
      return this.currentPassage.loaded
    },
    currentPassageData() {
      return this.currentPassage.data
    },
    currentPassageText() {
      if (this.currentPassageData && this.currentPassageData.passageText) {
        return this.currentPassageData.passageText.join(" ")
      }

      return ""
    },
    currentPassageError() {
      return this.currentPassage.error
    }
  },
  methods: {
    loadCurrentPassage() {
      this.$store.dispatch("bible/fetchCurrentPassage")
    }
  }
}
</script>

<style>
  .passage-rotator {
    align-items: center;
    display: flex;
    flex: auto;
    justify-content: center;
    width: 100%;
  }

  .passage-text {
    font-size: 2rem;
    line-height: 3rem;
    padding: 2rem;
  }
</style>
