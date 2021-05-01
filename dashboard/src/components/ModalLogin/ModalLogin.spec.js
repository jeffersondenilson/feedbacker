import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'
import Toast, { POSITION } from 'vue-toastification'
import { shallowMount } from '@vue/test-utils'
import ModalLogin from '.'
import { useField } from 'vee-validate'
import bus from '@/utils/bus'
import useModal from '@/hooks/useModal'

jest.mock('vee-validate', () => {
  return {
    useField: jest.fn(() => {
      return { value: '', errorMessage: '' }
    })
  }
})

const EVENT_NAME = 'modal:toggle'
const mockUseModal = {
  listen (fn) {
    bus.on(EVENT_NAME, fn)
  },
  close (payload = {}) {
    bus.emit(EVENT_NAME, { ...payload, status: false })
  }
}
jest.mock('@/hooks/useModal', () => {
  // executa quando o arquivo é importado
  return () => {
    return {
      listen: mockUseModal.listen,
      close: mockUseModal.close
    }
  }
})

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

describe('<ModalLogin />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render modal-login correctly', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(ModalLogin, {
      global: {
        plugins: [
          router,
          [Toast, { position: POSITION.BOTTOM_RIGHT }]
        ]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set correct value in email input', async () => {
    const email = 'valid@email.com'
    useField.mockReturnValue({ value: email, errorMessage: '' })
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(ModalLogin, {
      global: {
        plugins: [
          router,
          [Toast, { position: POSITION.BOTTOM_RIGHT }]
        ]
      }
    })

    const emailInput = wrapper.find('[data-test=email-input]')
    const emailErrorMessage = wrapper.find('[data-test=email-error-message]')
    await emailInput.setValue(email)

    expect(emailInput.element.value).toBe(email)
    expect(emailErrorMessage.exists()).toBe(false)
  })

  it('should show error with invalid email', async () => {
    const email = 'invalid.email'
    const errorMessage = '*Este campo precisa ser um e-mail válido'
    useField.mockImplementation((field, validator) => {
      if(field === 'email') {
        return { value: email, errorMessage }
      }
      return { value: '', errorMessage: '' }
    })
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(ModalLogin, {
      global: {
        plugins: [
          router,
          [Toast, { position: POSITION.BOTTOM_RIGHT }]
        ]
      }
    })

    const emailInput = wrapper.find('[data-test=email-input]')
    const emailErrorMessage = wrapper.find('[data-test=email-error-message]')
    await emailInput.setValue(email)

    expect(emailInput.element.value).toBe(email)
    expect(emailInput.classes('border-brand-danger')).toBe(true)
    expect(emailErrorMessage.exists()).toBe(true)
    expect(emailErrorMessage.text()).toBe(errorMessage)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set correct value in password input', async () => {
    const password = '123'
    useField.mockReturnValue({ value: password, errorMessage: '' })
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(ModalLogin, {
      global: {
        plugins: [
          router,
          [Toast, { position: POSITION.BOTTOM_RIGHT }]
        ]
      }
    })

    const passwordInput = wrapper.find('[data-test=password-input]')
    const passwordErrorMessage = wrapper.find('[data-test=password-error-message]')
    await passwordInput.setValue(password)

    expect(passwordInput.element.value).toBe(password)
    expect(passwordErrorMessage.exists()).toBe(false)
  })

  it('should show error with invalid password', async () => {
    const password = '12'
    const errorMessage = '*No mínimo 3 caracteres'
    useField.mockImplementation((field, validator) => {
      if(field === 'password') {
        return { value: password, errorMessage }
      }
      return { value: '', errorMessage: '' }
    })
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(ModalLogin, {
      global: {
        plugins: [
          router,
          [Toast, { position: POSITION.BOTTOM_RIGHT }]
        ]
      }
    })

    const passwordInput = wrapper.find('[data-test=password-input]')
    const passwordErrorMessage = wrapper.find('[data-test=password-error-message]')
    await passwordInput.setValue(password)

    expect(passwordInput.element.value).toBe(password)
    expect(passwordInput.classes('border-brand-danger')).toBe(true)
    expect(passwordErrorMessage.exists()).toBe(true)
    expect(passwordErrorMessage.text()).toBe(errorMessage)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should trigger form submition', async () => {
    const spy = jest.fn()
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(ModalLogin, {
      global: {
        plugins: [
          router,
          [Toast, { position: POSITION.BOTTOM_RIGHT }]
        ],
        mocks: {
          handleSubmit: spy
        }
      }
    })
    
    const submitButton = wrapper.find('[data-test=login-submit-button]')
    await submitButton.trigger('submit')

    expect(wrapper.emitted()).toHaveProperty('submit')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should show loading icon when button is clicked', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(ModalLogin, {
      global: {
        plugins: [
          router,
          [Toast, { position: POSITION.BOTTOM_RIGHT }]
        ]
      }
    })
    
    const submitButton = wrapper.find('[data-test=login-submit-button]')
    expect(submitButton.text()).toBe('Entrar')
    await submitButton.trigger('submit')

    expect(submitButton.classes('opacity-50')).toBe(true)
    expect(submitButton.attributes()).toHaveProperty('disabled')

    const loadingIcon = wrapper.find('[data-test=submit-loading-icon]')
    expect(loadingIcon.exists()).toBe(true)
    expect(submitButton.html()).toMatchSnapshot()
  })

  it('should emit modal close when click close button', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(ModalLogin, {
      global: {
        plugins: [
          router,
          [Toast, { position: POSITION.BOTTOM_RIGHT }]
        ]
      }
    })
    const spy = jest.fn()
    const modal = useModal()
    modal.listen(spy)

    const closeButton = wrapper.find('[data-test=close-button]')
    closeButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
