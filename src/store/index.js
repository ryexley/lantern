import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { EnvModule } from "@/store/modules/env"
import { BibleService } from "@/services/bible"
import { BibleModule } from "@/store/modules/bible"
import createPersistedState from "vuex-persistedstate"

const STORAGE_KEY = "lantern:data"

const env = new EnvModule()
const bibleServiceFactory = env => new BibleService({ axios, env })
const bible = new BibleModule({ bibleServiceFactory })

Vue.use(Vuex)

const getDefaultState = () => ({
  appDataLoaded: false
})

export function storeConfigFactory(/* {} */) {
  return {
    modules: {
      env,
      bible
    },
    state: getDefaultState(),
    mutations: {},
    actions: {
      async loadAppData({ dispatch }) {
        await dispatch("env/init", {}, { root: true })
        await dispatch("bible/init", {}, { root: true })
        await dispatch("bible/fetchPassageCollections", {}, { rot: true })
      }
    },
    plugins: [
      createPersistedState({
        key: STORAGE_KEY,
        storage: window.localStorage,
        reducer: state => state
      })
    ]
  }
}

export default new Vuex.Store(storeConfigFactory())
