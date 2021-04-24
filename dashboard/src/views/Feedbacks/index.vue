<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Feedbacks
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div id="list" class="flex justify-center w-full pb-20">
    <div class="w-11/12 md:w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div class="md:pl-10 col-span-4 md:col-span-3 lg:col-span-1">
        <h1 class="text-3xl font-black text-gray-800">
          Listagem
        </h1>
        <suspense>
          <template #default>
            <!-- TODO: animação? -->
            <filters
              id="filters"
              @select="changeFeedbacksType"
              :class="{
                'lg:fixed lg:top-0 lg:w-1/6': state.isScrollingFeedbacks
              }"
              class="mt-8 animate__animated animate__fadeIn animate__faster"
            />
          </template>
          <template #fallback>
            <filters-loading id="filters" class="mt-8" />
          </template>
        </suspense>
      </div>

      <div class="md:px-10 pt-5 lg:pt-20 col-span-4 lg:col-span-3">
        <p
          v-if="state.hasError"
          class="text-lg text-center text-brand-danger font-regular"
        >
          Aconteceu um erro ao carregar os feedbacks
        </p>
        <p
          v-if="!state.feedbacks.length && !state.isLoading
          && !state.isLoadingFeedbacks && !state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Ainda nenhum feedback recebido
        </p>

        <feedback-card-loading v-if="state.isLoading || state.isLoadingFeedbacks" />
        <feedback-card
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />
        <feedback-card-loading v-if="state.isLoadingMoreFeedbacks" />
      </div>
    </div>
  </div>
  <!-- TODO: animação? lg:left? -->
  <a
    v-if="state.isScrollingFeedbacks"
    href="#list"
    class="fixed bottom-3 md:bottom-10 right-3 md:right-10 p-2 md:p-4
      w-10 h-10 md:w-14 md:h-14 bg-brand-main rounded-full z-100"
    title="Voltar ao topo"
  >
    <icon name="chevron-down" class="transform rotate-180" size="100%" />
  </a>
</template>

<script>
import { reactive, onMounted, onUnmounted, onErrorCaptured } from 'vue'
import FeedbackCard from '@/components/FeedbackCard'
import FeedbackCardLoading from '@/components/FeedbackCard/Loading'
import Filters from './Filters'
import FiltersLoading from './FiltersLoading'
import HeaderLogged from '@/components/HeaderLogged'
import Icon from '@/components/Icon'
import services from '@/services'

let filtersInitialPos = 0

export default {
  components: {
    FeedbackCard,
    FeedbackCardLoading,
    Filters,
    FiltersLoading,
    HeaderLogged,
    Icon
  },
  setup () {
    const state = reactive({
      isLoading: false,
      isLoadingFeedbacks: false,
      isLoadingMoreFeedbacks: false,
      feedbacks: [],
      currentFeedbackType: '',
      pagination: {
        limit: 5,
        offset: 0,
        total: 0
      },
      hasError: false,
      isScrollingFeedbacks: false
    })

    onErrorCaptured(handleErrors)

    onMounted(() => {
      fetchFeedbacks()
      window.addEventListener('scroll', handleScroll)
      // TODO: usar ref?
      filtersInitialPos = document.getElementById('filters').offsetTop
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    function handleErrors (error) {
      state.isLoading = false
      state.hasError = !!error
    }

    async function handleScroll () {
      const scrollTop = document.documentElement.scrollTop
      const isBottomOfWindow = Math.ceil(
        scrollTop + window.innerHeight
      ) >= document.documentElement.scrollHeight

      state.isScrollingFeedbacks = scrollTop >= filtersInitialPos

      if (state.isLoading || state.isLoadingMoreFeedbacks) return
      if (!isBottomOfWindow) return
      if (state.feedbacks.length >= state.pagination.total) return

      try {
        state.isLoadingMoreFeedbacks = true
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
          offset: (state.pagination.offset + 5)
        })

        if (data.results.length) {
          state.feedbacks.push(...data.results)
        }

        state.pagination = data.pagination
      } catch (error) {
        handleErrors(error)
      } finally {
        state.isLoadingMoreFeedbacks = false
      }
    }

    async function changeFeedbacksType (type) {
      try {
        state.isLoadingFeedbacks = true
        state.pagination.offset = 0
        state.pagination.limit = 5
        state.currentFeedbackType = type
        const { data } = await services.feedbacks.getAll({
          type,
          ...state.pagination
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoadingFeedbacks = false
      } catch (error) {
        handleErrors(error)
      }
    }

    async function fetchFeedbacks () {
      try {
        state.isLoading = true
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoading = false
      } catch (error) {
        handleErrors(error)
      }
    }

    return {
      state,
      changeFeedbacksType
    }
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
