<template>
  <fragment>
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
  </fragment>
</template>

<script>
import { Fragment } from "vue-fragment"
import LoadingIndicator from "@/components/ui/loading-indicator"
import PassageCollectionList from "@/components/lantern/passage-collection-list"

export default {
  name: "home",
  components: {
    Fragment,
    LoadingIndicator,
    PassageCollectionList
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
  .home-header {
    margin: 0 0 5rem 0;
  }

  .home-passage-collection-list {
    margin: 2rem;
  }
</style>
