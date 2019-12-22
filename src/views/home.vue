<template>
  <section class="home-main" :style="mainStyle">
    <header class="home-header">
      <h1>{{ $t("views.home.HEADING") }}</h1>
      <h3>{{ $t("views.home.SUB-HEADING") }}</h3>
    </header>
    <section class="home-passage-collection-list">
      <loading-indicator
        v-show="!passageCollectionsLoaded"
        class="passage-collections-loading-indicator"
        :labelKey="'views.home.COLLECTIONS_LOADING_TEXT'" />
      <passage-collection-list
        v-if="passageCollectionsLoaded"
        :collections="passageCollectionsData" />
      </section>
  </section>
</template>

<script>
import LoadingIndicator from "@/components/ui/loading-indicator"
import PassageCollectionList from "@/components/lantern/passage-collection-list"
import lanternBackground from "@/assets/images/lantern-background.jpg"

export default {
  name: "home",
  components: {
    LoadingIndicator,
    PassageCollectionList
  },
  data() {
    return {
      mainStyle: {
        backgroundImage: `url(${lanternBackground})`
      }
    }
  },
  computed: {
    passageCollections() {
      const {
        bible: {
          data: {
            passageCollections
          }
        }
      } = this.$store.state

      return passageCollections
    },
    passageCollectionsLoaded() {
      return this.passageCollections.loaded
    },
    passageCollectionsData() {
      return this.passageCollections.data
    },
    passageCollectionsError() {
      return this.passageCollections.error
    }
  }
}
</script>

<style>
  .home-main {
    align-items: center;
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.5);
    background-position: center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    width: 100vw;

    &::after {
      background: rgba(255, 255, 255, 0.85);
      content: "";
      min-height: 100vh;
      position: fixed;
      width: 100vw;
      z-index: -1;
    }
  }

  .home-header {
    color: var(--theme--color-text--dark);
    margin: 0 0 5rem 0;
    padding: 2rem;
  }

  .home-passage-collection-list {
    margin: 2rem;
  }
</style>
