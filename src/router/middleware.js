import store from "@/store"

export function onBeforeEnterHome(to, from, next) {
  store.dispatch("bible/clearCurrentPassageCollection")
  store.dispatch("bible/resetPassageRotation")

  return next()
}
