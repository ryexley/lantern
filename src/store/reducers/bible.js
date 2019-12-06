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
    }
  }
})
