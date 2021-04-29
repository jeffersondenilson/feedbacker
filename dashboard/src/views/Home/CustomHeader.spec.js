import { createRouter, createWebHistory } from 'vue-router'
import { shallowMount } from '@vue/test-utils'
import CustomHeader from './CustomHeader'
import { routes } from '@/router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

describe('<CustomHeader />', () => {
  it('should render custom-header correctly', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(CustomHeader, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit create-account from top button', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(CustomHeader, {
      global: {
        plugins: [router]
      }
    })

    const buttonTop = wrapper.find('[data-test=create-account-button-top]')
    await buttonTop.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('create-account')
  })

  it('should emit create-account from middle button', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(CustomHeader, {
      global: {
        plugins: [router]
      }
    })

    const buttonMiddle = wrapper
      .find('[data-test=create-account-button-middle]')
    await buttonMiddle.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('create-account')
  })

  it('should emit login from button', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(CustomHeader, {
      global: {
        plugins: [router]
      }
    })

    const loginButton = wrapper.find('[data-test=login-button]')
    await loginButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('login')
  })
})
