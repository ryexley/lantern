import store from "@/store"

export function onBeforeEnterHome(to, from, next) {
  store.dispatch("bible/clearCurrentPassageCollection")

  return next()
}
