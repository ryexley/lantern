import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { BibleService } from "@/services/bible"
import { BibleModule } from "@/store/modules/bible"
import createPersistedState from "vuex-persistedstate"

const STORAGE_KEY = "lantern:data"

const bibleService = new BibleService({ axios })
const bibleModule = new BibleModule({ bibleService })

Vue.use(Vuex)

const getDefaultState = () => ({
  appDataLoaded: false
})

export function storeConfigFactory(/* {} */) {
  return {
    modules: {
      bibleModule
    },
    state: getDefaultState(),
    mutations: {},
    actions: {},
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
