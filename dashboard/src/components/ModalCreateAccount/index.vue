<template>
  <div class="flex justify-between">
    <h1 class="text-xl sm:text-4xl font-black text-gray-800">
      Crie sua conta
    </h1>

    <button
      @click="close"
      class="text-4xl text-gray-600 focus:outline-none"
      data-test="close-button"
    >
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit" data-test="create-account-form">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">Nome</span>
        <input
          v-model="state.name.value"
          type="text"
          :class="{ 'border-brand-danger': !!state.name.errorMessage }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="Jane Doe"
          data-test="name-input"
        />
        <span
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
          data-test="name-error-message"
        >
          {{ state.name.errorMessage }}
        </span>
      </label>

      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          v-model="state.email.value"
          type="email"
          :class="{ 'border-brand-danger': !!state.email.errorMessage }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="jane.doe@gmail.com"
          data-test="email-input"
        />
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
          data-test="email-error-message"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-5">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          v-model="state.password.value"
          type="password"
          :class="{ 'border-brand-danger': !!state.password.errorMessage }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="******"
          data-test="password-input"
        />
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
          data-test="password-error-message"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        :disabled="disableSubmit"
        type="submit"
        :class="{ 'opacity-50': disableSubmit }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
        data-test="create-account-submit-button"
      >
        <icon
          v-if="state.isLoading"
          name="loading"
          class="animate-spin"
          data-test="submit-loading-icon"
        />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import Icon from '../Icon'
import useModal from '@/hooks/useModal'
import {
  validateEmptyAndEmail,
  validateEmptyAndLength3,
  validateEmptyAndName
} from '@/utils/validators'
import services from '@/services'

export default {
  components: { Icon },
  setup () {
    const modal = useModal()
    const router = useRouter()
    const toast = useToast()

    const {
      value: nameValue,
      errorMessage: nameErrorMessage
    } = useField('name', validateEmptyAndName)

    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    const disableSubmit = computed(() => {
      const hasFormErrors = !state.name.value || state.name.errorMessage ||
        !state.email.value || state.email.errorMessage ||
        !state.password.value || state.password.errorMessage

      return state.isLoading || !!hasFormErrors
    })

    async function login ({ email, password }) {
      const { data, errors } = await services.auth.login({
        email,
        password
      })

      if (!errors) {
        window.localStorage.setItem('token', data.token)
        router.push({ name: 'Feedbacks' })
        modal.close()
      }
    }

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          await login({
            email: state.email.value,
            password: state.password.value
          })
        } else if (errors.status === 400) {
          toast.error('Ocorreu um erro ao criar conta')
        }
      } catch (error) {
        state.hasErrors = !!error
        toast.error('Ocorreu um erro ao criar conta')
      } finally {
        state.isLoading = false
      }
    }

    return {
      state,
      handleSubmit,
      disableSubmit,
      close: modal.close
    }
  }
}
</script>
