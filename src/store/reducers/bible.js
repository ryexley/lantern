import { reducer } from "#/store/reducer"

export const bible = reducer({
  defaultState: {
    passageCollections: {
      loading: true,
      data: null,
      error: null
    },
    passageCollection: {
      loading: true,
      data: null,
      error: null
    },
    passageRotation: {
      currentIndex: 0,
      currentPassage: {},
      passages: []
    }
  },
  handlers: {
    "bible:passageCollectionList:fetchBegin"(state) {
      const { passageCollections } = state

      return {
        ...state,
        passageCollections: {
          ...passageCollections,
          loading: true
        }
      }
    },

    "bible:passageCollectionList:fetchSuccess"(state, { collections }) {
      return {
        ...state,
        passageCollections: {
          data: collections,
          loading: false,
          error: null
        }
      }
    },

    "bible:passageCollectionList:fetchFailed"(state, { error }) {
      const { passageCollections } = state

      return {
        ...state,
        passageCollections: {
          ...passageCollections,
          error
        }
      }
    },

    "bible:passageCollection:fetchBegin"(state) {
      const { passageCollection } = state

      return {
        ...state,
        passageCollection: {
          ...passageCollection,
          loading: true
        }
      }
    },

    "bible:passageCollection:fetchSuccess"(state, { collection }) {
      return {
        ...state,
        passageCollection: {
          loading: false,
          data: collection,
          error: null
        }
      }
    },

    "bible:passageCollection:fetchFailed"(state, { error }) {
      const { passageCollection } = state

      return {
        ...state,
        passageCollection: {
          ...passageCollection,
          error
        }
      }
    },

    "bible:passageRotation:init"(state, { passages }) {
      const currentIndex = 0
      const currentPassage = passages[currentIndex]

      return {
        ...state,
        passageRotation: {
          currentIndex,
          currentPassage,
          passages
        }
      }
    },

    "bible:passageRotation:currentPassage:fetchSuccess"(state, { passage }) {
      const { passageRotation } = state

      return {
        ...state,
        passageRotation: {
          ...passageRotation,
          currentPassage: {
            loading: false,
            data: passage,
            error: null
          }
        }
      }
    },

    "bible:passageRotation:currentPassage:fetchFailed"(state, { error }) {
      const { passageRotation } = state

      return {
        ...state,
        passageRotation: {
          ...passageRotation,
          currentPassage: {
            loading: false,
            data: null,
            error
          }
        }
      }
    }
  }
})
