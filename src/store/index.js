import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { EnvModule } from "@/store/modules/env"
import { BibleService } from "@/services/bible"
import { BibleModule } from "@/store/modules/bible"

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
    plugins: []
  }
}

export default new Vuex.Store(storeConfigFactory())
