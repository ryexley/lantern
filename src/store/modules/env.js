import { EnvError } from "@/errors/env-error"
import { isEmpty } from "@/util"

export function EnvModule() {
  const getDefaultState = () => ({
    data: {}
  })

  const requireVar = name => {
    if (isEmpty(process.env[name])) {
      throw new EnvError(`process.env.${name} must be defined and have a valid value`)
    }

    return process.env[name]
  }

  return {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
      SET_ENV(state, env) {
        const { data } = state

        state.data = {
          ...data,
          ...env
        }
      }
    },
    actions: {
      init({ commit }) {
        const API_URL = requireVar("VUE_APP_API_URL")

        commit("SET_ENV", {
          API_URL
        })
      }
    },
    getters: {}
  }
}
