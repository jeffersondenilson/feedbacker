<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credenciais
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col items-center w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalação e configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Esta aqui é sua chave de api:
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="flex py-3 pl-5 mt-2 rounded justify-between items-center
        bg-brand-gray w-full lg:w-1/2"
      >
        <span v-if="state.hasError" class="text-brand-danger font-bold">
          Erro ao carregar a chave de api
        </span>
        <span v-else>{{ store.User.currentUser.apiKey }}</span>
        <div class="flex ml-20 mr-1" v-if="!state.hasError">
          <icon
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
            @click="() => handleCopy(store.User.currentUser.apiKey)"
          />
          <icon
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
            @click="handleGenerateApiKey"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks:
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="flex py-3 pl-5 pr-15 mt-2 rounded justify-between bg-brand-gray
        w-full lg:w-1/2"
      >
        <span v-if="state.hasError" class="text-brand-danger font-bold">
          Erro ao carregar o script
        </span>
        <pre v-else class="overflow-x-scroll">{{ computedScript }}</pre>
        <div class="flex ml-20 mr-1" v-if="!state.hasError">
          <icon
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
            @click="() => handleCopy(computedScript)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch, computed } from 'vue'
import { useToast } from 'vue-toastification'
import ContentLoader from '../../components/ContentLoader'
import HeaderLogged from '../../components/HeaderLogged'
import Icon from '../../components/Icon'
import services from '../../services'
import { setApiKey } from '../../store/user'
import useStore from '../../hooks/useStore'
import { brand as brandColors } from '../../../palette'

export default {
  components: { ContentLoader, HeaderLogged, Icon },
  setup () {
    const toast = useToast()
    const store = useStore()

    const state = reactive({
      hasError: false,
      isLoading: false
    })

    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true)
      }
    })

    const computedScript = computed(() => `<script src="https://jeffersondenilson-feedbacker-widget.netlify.app?api_key=${store.User.currentUser.apiKey}" />`)

    function handleError (error) {
      state.isLoading = false
      state.hasError = !!error
    }

    async function handleGenerateApiKey () {
      try {
        state.isLoading = true
        const { data } = await services.users.generateApiKey()

        setApiKey(data.apiKey)
        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    async function handleCopy (text) {
      toast.clear()

      try {
        await navigator.clipboard.writeText(text)
        toast.success('Copiado!')
      } catch (error) {
        handleError(error)
      }
    }

    return {
      state,
      store,
      handleGenerateApiKey,
      handleCopy,
      brandColors,
      computedScript
    }
  }
}
</script>
