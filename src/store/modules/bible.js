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

      clearCurrentPassageCollection(state) {
        const { data } = state

        state.data = {
          ...data,
          currentPassageCollection: {
            loaded: false,
            data: {},
            error: null
          }
        }
      },

      initPassageRotation(state, passageRotation) {
        const { data } = state

        state.data = {
          ...data,
          passageRotation
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
      },

      updatePassageRotation(state, passageRotation) {
        const { data } = state

        state.data = {
          ...data,
          passageRotation
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

      async fetchPassageCollection({ state, commit }, { slug }) {
        const collection = await bibleService.getCollection(slug)
        commit("setCurrentPassageCollection", collection)

        // init passage rotation...should probably move this to a
        // standalone action, doing too much in here
        const { references } = collection
        const passages = references.map(reference => {
          const { slug } = reference

          return {
            reference: slug,
            loaded: false,
            data: {},
            error: null
          }
        })

        const { passageRotation } = state.data
        const { currentIndex } = passageRotation
        let { currentPassage } = passageRotation

        if (passages.length > 0) {
          const currentPassageReference = passages[currentIndex].reference
          const currentPassageData = await bibleService.getPassage(currentPassageReference)

          currentPassage = {
            reference: currentPassageReference,
            loaded: true,
            data: currentPassageData,
            error: null
          }

          passages.splice(currentIndex, 1, currentPassage)
        }

        const initializedPassageRotation = {
          currentIndex,
          passages,
          currentPassage
        }

        commit("initPassageRotation", initializedPassageRotation)
      },

      async clearCurrentPassageCollection({ commit }) {
        commit("clearCurrentPassageCollection")
      },

      async resetPassageRotation({ commit }) {
        const { data: { passageRotation } } = getDefaultState()

        commit("updatePassageRotation", passageRotation)
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
      },

      async rotatePassage({ state, commit }) {
        const { data: { passageRotation: currentPassageRotation } } = state
        const { currentIndex, passages } = currentPassageRotation

        if (passages.length === 0) {
          return
        }

        const onLastPassage = (currentIndex === (passages.length - 1))
        const newCurrentPassageIndex = onLastPassage ? 0 : (currentIndex + 1)

        let newCurrentPassage = passages[newCurrentPassageIndex]
        let { loaded, reference } = newCurrentPassage

        let passage = newCurrentPassage.data
        if (!loaded) {
          passage = await bibleService.getPassage(reference)
          loaded = true
        }

        newCurrentPassage = {
          reference,
          loaded,
          data: passage,
          error: null
        }

        passages.splice(newCurrentPassageIndex, 1, newCurrentPassage)

        const passageRotation = {
          ...currentPassageRotation,
          currentIndex: newCurrentPassageIndex,
          passages,
          currentPassage: newCurrentPassage
        }

        commit("updatePassageRotation", passageRotation)
      }
    }
  }
}
