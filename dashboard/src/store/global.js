import { reactive } from 'vue'

const initialState = {
  isLoading: false
}

let state = reactive(initialState)

export default state

export function setGlobalLoading (status) {
  state.isLoading = status
}

export function resetGlobalStore () {
  state = reactive(initialState)
}
