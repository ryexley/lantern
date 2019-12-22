<template>
  <section class="passage-rotator-container">
    <loading-indicator
      v-show="!currentPassageCollectionLoaded"
      class="passage-rotator-collection-loading"
      :labelKey="'views.passage-rotator.COLLECTION_LOADING_TEXT'" />
    <header v-if="currentPassageCollectionLoaded" class="collection-header">
      <h1>{{ currentPassageCollectionData.name }}</h1>
      <p>{{ currentPassageCollectionData.description }}</p>
    </header>
    <passage-rotation :passageRotation="passageRotation" />
  </section>
</template>

<script>
import LoadingIndicator from "@/components/ui/loading-indicator"
import PassageRotation from "@/components/lantern/passage-rotation"

export default {
  name: "passage-rotator",
  components: {
    LoadingIndicator,
    PassageRotation
  },
  created() {
    this.$store.dispatch("bible/fetchPassageCollection", {
      slug: this.collectionSlug
    })
  },
  computed: {
    collectionSlug() {
      const { slug } = this.$route.params

      return slug
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
    currentPassageCollectionLoaded() {
      return this.currentPassageCollection.loaded
    },
    currentPassageCollectionData() {
      return this.currentPassageCollection.data
    },
    currentPassageCollectionError() {
      return this.currentPassageCollection.error
    },
    passageRotation() {
      const {
        bible: {
          data: {
            passageRotation
          }
        }
      } = this.$store.state

      return passageRotation
    }
  }
}
</script>

<style>
  .passage-rotator-container {
    align-items: center;
    animation: gradient-background 200s ease infinite;
    background: linear-gradient(-67.5deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 1000%;
    color: var(--theme--color-text--light);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    width: 100vw;
  }

  .passage-rotator-collection-loading {
    margin: 1rem;
    padding: 0 1rem;
    width: 100%;
  }

  .collection-header {
    background: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(4px);
    padding: 1rem;
    position: sticky;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    text-transform: capitalize;
    top: 0;
    width: 100%;

    & h1 {
      margin: 0 0 0.5rem 0;
    }

    & p {
      margin: 0;
    }
  }

  @keyframes gradient-background {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
</style>
