<template>
  <article class="passage-rotator">
    <loading-indicator
      v-show="showPassageLoading"
      :labelKey="'components.lantern.passage-rotation.PASSAGE_LOADING_TEXT'" />
    <div v-if="showNoPassages" class="no-passages-to-show">
      <div class="sad-face">😞</div>
      <div class="message">{{ $t("components.lantern.passage-rotation.NO_PASSAGES_TEXT") }}</div>
    </div>
    <div v-if="currentPassageCollectionHasReferences" class="passage-text">
      {{ currentPassageText }}
    </div>
  </article>
</template>

<script>
import LoadingIndicator from "@/components/ui/loading-indicator"
import { isNotEmpty } from "@/util"

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
  computed: {
    showPassageLoading() {
      return (
        this.currentPassageCollectionHasReferences &&
        !this.currentPassageLoaded
      )
    },
    currentPassageCollection() {
      const {
        bible: {
          data: {
            currentPassageCollection
          }
        }
      } = this.$store.state

      return currentPassageCollection
    },
    currentPassageCollectionHasReferences() {
      const { data: { references } } = this.currentPassageCollection

      return isNotEmpty(references) ? references.length > 0 : false
    },
    currentPassageCollectionLoaded() {
      return this.currentPassageCollection.loaded
    },
    currentPassage() {
      const { currentPassage } = this.passageRotation

      return currentPassage
    },
    currentPassageLoaded() {
      return isNotEmpty(this.currentPassage) ? this.currentPassage.loaded : false
    },
    currentPassageData() {
      return isNotEmpty(this.currentPassage) ? this.currentPassage.data : null
    },
    currentPassageText() {
      if (this.currentPassageData && this.currentPassageData.passageText) {
        return this.currentPassageData.passageText.join(" ")
      }

      return ""
    },
    currentPassageError() {
      return isNotEmpty(this.currentPassage) ? this.currentPassage.error : null
    },
    showNoPassages() {
      return (
        this.currentPassageCollectionLoaded &&
        !this.currentPassageCollectionHasReferences
      )
    }
  },
  methods: {
    loadCurrentPassage() {
      if (this.currentPassageCollectionHasReferences && !this.currentPassageLoaded) {
        this.$store.dispatch("bible/fetchCurrentPassage")
      }
    }
  },
  watch: {
    currentPassageCollection(newValue) {
      if (newValue.loaded) {
        this.loadCurrentPassage()
      }
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

  .no-passages-to-show {
    color: var(--theme--color-text--light);

    & .sad-face {
      display: flex;
      font-size: 10rem;
      justify-content: center;
      line-height: 10rem;
      opacity: 0.1;
      padding: 0 0 2.5rem 0;
    }

    & .message {
      font-size: 2rem;
      line-height: 3rem;
      padding: 0 5rem;
      text-align: center;
    }
  }

  .passage-rotation-countdown-timer {
    background: #f7f7f7;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
</style>
