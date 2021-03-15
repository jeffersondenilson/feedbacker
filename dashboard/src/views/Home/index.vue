<template>
  <custom-header
    @create-account="handleAccountCreate"
    @login="handleLogin"
  />
  <contact />
  <footer class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">
      Feedbacker © 2021
    </p>
  </footer>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CustomHeader from './CustomHeader.vue'
import Contact from './Contact.vue'

export default {
  components: { CustomHeader, Contact },
  setup () {
    const router = useRouter()

    onMounted(() => {
      const token = window.localStorage.getItem('feedbacker-token')
      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })

    function handleLogin () {}

    function handleAccountCreate () {}

    return {
      handleLogin,
      handleAccountCreate
    }
  }
}
</script>
