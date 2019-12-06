import { createStore as reduxStore, combineReducers } from "redux"
import { bible } from "#/store/reducers/bible"

function enableReduxDevTools() {
  /* eslint-disable no-underscore-dangle */
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    window.__REDUX_DEVTOOLS_EXTENSION__()
  }
  /* eslint-enable no-underscore-dangle */
}

export function createStore(initialState = {}) {
  const reducers = combineReducers({
    bible
  })

  return reduxStore(
    reducers,
    initialState,
    // enableReduxDevTools()
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}
