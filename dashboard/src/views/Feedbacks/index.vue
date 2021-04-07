<template>
  <h1>Feedbacks</h1>
  <br>
  <a href="/credentials" @click.prevent="() => router.push({ name: 'Credentials' })">
    credentials
  </a>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup () {
    const router = useRouter()

    return {
      router
    }
  }
}
</script>
