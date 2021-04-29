import { createRouter, createWebHistory } from 'vue-router'
import { shallowMount } from '@vue/test-utils'
import HeaderLogged from '.'
import { routes } from '@/router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const mockStore = { currentUser: {} }
jest.mock('@/hooks/useStore', () => {
  // executa quando o arquivo é importado
  return () => {
    return mockStore
  }
})

describe('<HeaderLogged />', () => {
  it('should render header-logged correctly', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render ... when there\'s no user logged', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })
    
    const logoutButton = wrapper.find('[data-test=logout-button]')
    expect(logoutButton.text()).toBe('...')
  })

  it('should render username when there\'s user logged', async () => {
    router.push('/')
    await router.isReady()
    mockStore.currentUser.name = 'User Name'
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const logoutButton = wrapper.find('[data-test=logout-button]')
    expect(logoutButton.text()).toBe('User Name (sair)')
  })
})
