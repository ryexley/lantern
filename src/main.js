import Vue from "vue"
import App from "@/app.vue"
import { i18n } from "@/i18n"
import { router } from "@/router"
import store from "@/store"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app")
