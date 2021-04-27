import { reactive } from 'vue'

const initialState = {
  currentUser: {}
}

let state = reactive(initialState)

export default state

export function resetUserStore () {
  state = reactive(initialState)
}

export function cleanCurrentUser () {
  state.currentUser = {}
}

export function setCurrentUser (user) {
  state.currentUser = user
}

export function setApiKey (apiKey) {
  const currentUser = { ...state.currentUser, apiKey }
  state.currentUser = currentUser
}
