export function BibleModule({ bibleServiceFactory }) {
  let bibleService = null
  const initBibleService = env => { bibleService = bibleServiceFactory(env) }
  const getDefaultState = () => ({
    data: {
      passageCollections: {
        loaded: false,
        data: [],
        error: null
      },
      currentPassageCollection: {
        loaded: false,
        data: {},
        error: null
      },
      passageRotation: {
        currentIndex: 0,
        passages: [],
        currentPassage: {
          loaded: false,
          data: {},
          error: null
        }
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
      },

      setCurrentPassageCollection(state, collection) {
        const { data } = state

        state.data = {
          ...data,
          currentPassageCollection: {
            loaded: true,
            data: collection,
            error: null
          }
        }
      },

      initPassageRotation(state, passages) {
        const { data } = state

        state.data = {
          ...data,
          passageRotation: {
            currentIndex: 0,
            passages,
            currentPassage: passages[0]
          }
        }
      },

      setCurrentPassage(state, passage) {
        const { data } = state
        const { passageRotation } = data

        state.data = {
          ...data,
          passageRotation: {
            ...passageRotation,
            currentPassage: {
              loaded: true,
              data: passage,
              error: null
            }
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
      },

      async fetchPassageCollection({ commit }, { slug }) {
        const collection = await bibleService.getCollection(slug)
        const { references } = collection
        const passages = references.map(reference => ({
          reference,
          loaded: false,
          data: {},
          error: null
        }))

        commit("setCurrentPassageCollection", collection)
        commit("initPassageRotation", passages)
      },

      async fetchCurrentPassage({ state, commit }) {
        const {
          data: {
            passageRotation: {
              currentPassage: {
                reference: { slug: reference }
              }
            }
          }
        } = state

        const passage = await bibleService.getPassage(reference)

        commit("setCurrentPassage", passage)
      }
    }
  }
}
