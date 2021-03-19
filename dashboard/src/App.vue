<template>
  <modal-factory />
  <router-view/>
</template>

<script>
import { watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ModalFactory from './components/ModalFactory'
import services from './services'

export default {
  components: { ModalFactory },
  setup () {
    const router = useRouter()
    const route = useRoute()

    watch(() => route.path, async () => {
      if (route.meta.hasAuth) {
        const token = window.localStorage.getItem('token')
        if (!token) {
          router.push({ name: 'Home' })
          return
        }
        // redireciona p/ Home caso o token não seja valido (401)
        const { data } = await services.users.getMe()
      }
    })
  }
}
</script>
