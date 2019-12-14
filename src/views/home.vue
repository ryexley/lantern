<template>
  <fragment>
    <h1>{{ $t("views.home.HEADING") }}</h1>
    <h3>{{ $t("views.home.SUB-HEADING") }}</h3>
  </fragment>
</template>

<script>
import { Fragment } from "vue-fragment"

export default {
  name: "home",
  components: {
    Fragment
  }
}
</script>
