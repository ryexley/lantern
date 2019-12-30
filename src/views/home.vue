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
import { setVh } from "@/util/set-vh"
import { debounce } from "@/util"

export default {
  name: "home",
  components: {
    LoadingIndicator,
    PassageCollectionList
  },
  mounted() {
    setVh()

    if (window) {
      window.addEventListener("resize", debounce(setVh, 250))
    }
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
    --min-height: calc(var(--vh, 1vh) * 100);
    align-items: center;
    backdrop-filter: blur(4px);
    background-attachment: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    background-position: center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    min-height: var(--min-height);
    transition: all 250ms ease-in-out;
    width: 100vw;

    &::after {
      background: rgba(255, 255, 255, 0.85);
      content: "";
      height: 100%;
      min-height: 100vh;
      min-height: var(--min-height);
      position: absolute;
      top: 0;
      transition: all 250ms ease-in-out;
      width: 100vw;
      z-index: -1;
    }
  }

  .home-header {
    color: var(--theme--color-text--dark);
    margin: 0 0 5rem 0;
    padding: 2rem;

    @media all and (max-width: 40rem) {
      margin: 0;
    }
  }

  .home-passage-collection-list {
    margin: 2rem;

    @media all and (max-width: 40rem) {
      margin: 0 2rem;
    }
  }
</style>
