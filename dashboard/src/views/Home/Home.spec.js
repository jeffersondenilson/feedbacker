import { createRouter, createWebHistory } from 'vue-router'
import { shallowMount } from '@vue/test-utils'
import Home from '.'
import { routes } from '@/router'
import bus from '@/utils/bus'
import useModal from '@/hooks/useModal'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const EVENT_NAME = 'modal:toggle'
const mockUseModal = {
  listen (fn) {
    bus.on(EVENT_NAME, fn)
  },
  open (payload = {}) {
    bus.emit(EVENT_NAME, { ...payload, status: true })
  }
}
jest.mock('@/hooks/useModal', () => {
  // executa quando o arquivo é importado
  return () => {
    return {
      listen: mockUseModal.listen,
      open: mockUseModal.open
    }
  }
})

describe('<Home />', () => {
  it('should render home correctly', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should call handleLogin with component = ModalLogin', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [router]
      }
    })
    const spy = jest.fn()
    const modal = useModal()
    modal.listen(spy)

    wrapper.vm.handleLogin()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      component: 'ModalLogin',
      status: true
    })
  })

  it('should call handleCreateAccount with component = ModalCreateAccount', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [router]
      }
    })
    const spy = jest.fn()
    const modal = useModal()
    modal.listen(spy)

    wrapper.vm.handleCreateAccount()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      component: 'ModalCreateAccount',
      status: true
    })
  })
})
