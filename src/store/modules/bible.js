export function BibleModule({ bibleServiceFactory }) {
  let bibleService = null
  const initBibleService = env => { bibleService = bibleServiceFactory(env) }
  const getDefaultState = () => ({
    data: {
      passageCollections: {
        loaded: false,
        data: [],
        error: null
      }
    }
  })

  return {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
      setPassageCollections(state, collections) {
        const { data } = state

        state.data = {
          ...data,
          passageCollections: {
            loaded: true,
            data: collections,
            error: null
          }
        }
      }
    },
    actions: {
      init({ rootState }) {
        const { env: { data } } = rootState
        initBibleService(data)
      },

      async fetchPassageCollections({ commit }) {
        const collections = await bibleService.getCollections()

        commit("setPassageCollections", collections)
      }
    }
  }
}
