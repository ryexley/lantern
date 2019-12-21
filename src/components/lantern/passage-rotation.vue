<template>
  <article class="passage-rotator">
    <loading-indicator
      v-show="showPassageLoading"
      :labelKey="'components.lantern.passage-rotation.PASSAGE_LOADING_TEXT'" />
    <div v-if="showNoPassages" class="no-passages-to-show">
      <div class="sad-face">😞</div>
      <div class="message">{{ $t("components.lantern.passage-rotation.NO_PASSAGES_TEXT") }}</div>
    </div>
    <div v-if="currentPassageCollectionHasReferences" class="passage-text" ref="passageText">
      <span :style="passageTextStyle">{{ currentPassageText }}</span>
      <span class="passage-reference" :style="passageTextStyle">{{ currentPassageReferenceDisplayText }}</span>
    </div>
  </article>
</template>

<script>
import LoadingIndicator from "@/components/ui/loading-indicator"
import { TIME, PASSAGE_ROTATION_DIRECTION } from "@/enums"
import { findPassageFontStyle } from "@/util/passage-font-scale"
import { debounce, isNotEmpty } from "@/util"

export default {
  name: "passage-rotation",
  components: { LoadingIndicator },
  props: {
    passageRotation: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", debounce(this.calculatePassageTextSize, 250))
      document.body.addEventListener("click", this.onClick)
    })
  },
  destroyed() {
    this.stopRotation()
  },
  data() {
    return {
      rotationInterval: TIME.FIVE_SECONDS, // TIME.ONE_MINUTE,
      rotationIntervalId: null,
      passageFontSize: "2",
      passageLineHeight: "150"
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
    currentPassageReferenceDisplayText() {
      if (this.currentPassageData && this.currentPassageData.referenceDisplayText) {
        return this.currentPassageData.referenceDisplayText
      }

      return null
    },
    currentPassageError() {
      return isNotEmpty(this.currentPassage) ? this.currentPassage.error : null
    },
    showNoPassages() {
      return (
        this.currentPassageCollectionLoaded &&
        !this.currentPassageCollectionHasReferences
      )
    },
    canStartRotation() {
      return (
        this.currentPassageCollectionLoaded &&
        this.currentPassageCollectionHasReferences
      )
    },
    canLoadCurrentPassage() {
      return (
        this.currentPassageCollectionHasReferences &&
        !this.currentPassageLoaded
      )
    },
    passageTextStyle() {
      return {
        fontSize: this.passageFontSize,
        lineHeight: this.passageLineHeight
      }
    }
  },
  methods: {
    async loadCurrentPassage() {
      if (this.canLoadCurrentPassage) {
        await this.$store.dispatch("bible/fetchCurrentPassage")
      }
    },
    calculatePassageTextSize() {
      this.$nextTick(() => {
        const { clientWidth } = this.$refs.passageText
        const characterCount = this.currentPassageText.length

        const { fontSize, lineHeight } = findPassageFontStyle({
          containerWidth: clientWidth,
          characterCount
        })

        this.passageFontSize = fontSize
        this.passageLineHeight = lineHeight
      })
    },
    startRotation() {
      this.rotationIntervalId = setInterval(() => {
        this.$store.dispatch("bible/rotatePassage")
      }, this.rotationInterval)
    },
    stopRotation() {
      if (this.rotationIntervalId) {
        clearInterval(this.rotationIntervalId)
      }
    },
    rotatePassage(direction) {
      this.$store.dispatch("bible/movePassageIndex", { direction })
    },
    onClick(e) {
      const { clientWidth: viewportWidth } = document.body
      const { clientX: clickedX } = e
      const clickedOnRightSide = clickedX > (viewportWidth / 2)

      const passageRotationDirection = clickedOnRightSide ? PASSAGE_ROTATION_DIRECTION.NEXT : PASSAGE_ROTATION_DIRECTION.PREVIOUS

      this.rotatePassage(passageRotationDirection)
    }
  },
  watch: {
    currentPassageCollectionLoaded(newValue) {
      if (newValue === true) {
        // this.startRotation()
      }
    },
    currentPassageText(newValue) {
      if (newValue.length > 0) {
        this.calculatePassageTextSize()
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
  }

  .passage-text {
    display: flex;
    flex: auto;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 2rem 5rem;

    & span {
      font-size: 1.5rem;
      line-height: 150%;
    }

    @media all and (max-width: 40rem) {
      padding: 2rem;
    }
  }

  .passage-reference {
    color: var(--theme--color-text--light);
    display: inline-block;
    font-style: italic;
    margin: 1rem 0;
    text-align: right;
    width: 100%;
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
