<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="hidden sm:block w-24 lg:w-36">
      <img
        class="w-full"
        src="../../assets/images/logo.png"
        alt="logo"
      />
    </div>

    <div class="flex">
      <ul class="flex flex-wrap justify-center items-center list-none">
        <li
          @click="() => router.push({ name: 'Credentials' })"
          class="px-4 md:px-6 py-2 mr-2 font-bold text-white
          rounded-full cursor-pointer focus:outline-none"
        >
          Credenciais
        </li>
        <li
          @click="() => router.push({ name: 'Feedbacks' })"
          class="px-4 md:px-6 py-2 mr-2 font-bold text-white
          rounded-full cursor-pointer focus:outline-none"
        >
          Feedbacks
        </li>
        <li
          @click="handleLogout()"
          class="mt-2 px-6 py-2 text-sm md:text-base font-bold bg-white text-brand-main
          rounded-full cursor-pointer focus:outline-none"
        >
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '@/hooks/useStore'
import { cleanCurrentUser } from '@/store/user'

export default {
  setup () {
    const router = useRouter()
    const store = useStore('User')

    const logoutLabel = computed(() => {
      if (!store.currentUser.name) {
        return '...'
      }
      return `${store.currentUser.name} (sair)`
    })

    function handleLogout () {
      window.localStorage.removeItem('token')
      cleanCurrentUser()
      router.push({ name: 'Home' })
    }

    return {
      router,
      logoutLabel,
      handleLogout
    }
  }
}
</script>
