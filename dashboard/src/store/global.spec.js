import useStore from '../hooks/useStore'
import {
  resetGlobalStore,
  setGlobalLoading
} from './global'

describe('GlobalStore', () => {
  afterEach(() => {
    resetGlobalStore()
  })

  it('should start with isLoading = false by default', () => {
    const store = useStore()

    expect(store.Global.isLoading).toBe(false)
  })

  it('should set isLoading to true', () => {
    const store = useStore()

    setGlobalLoading(true)

    expect(store.Global.isLoading).toBe(true)
  })
})
