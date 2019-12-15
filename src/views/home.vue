<template>
  <fragment>
    <h1>{{ $t("views.home.HEADING") }}</h1>
    <h3>{{ $t("views.home.SUB-HEADING") }}</h3>
    <loading-indicator
      v-show="!passageCollectionsLoaded"
      :labelKey="'views.home.COLLECTIONS_LOADING_TEXT'" />
    <passage-collection-list
      v-if="passageCollectionsLoaded"
      :collections="passageCollectionsData" />
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
