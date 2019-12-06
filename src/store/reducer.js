export function reducer({ defaultState, handlers }) {
  return function actionHandlerMap(state = defaultState, action) {
    const { type } = action
    const handler = handlers[type]

    if (handler && typeof handler === "function") {
      const { type, ...args } = action // eslint-disable-line no-shadow, no-unused-vars

      return handler(state, args)
    }

    return state
  }
}
