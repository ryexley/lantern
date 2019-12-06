import React from "react"
import PropTypes from "prop-types"
import { Provider } from "react-redux"
import { createStore } from "#/store"

export const StoreProvider = ({ element }) => {
  const store = createStore()

  return <Provider store={store}>{element}</Provider>
}

StoreProvider.propTypes = {
  element: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]).isRequired
}
