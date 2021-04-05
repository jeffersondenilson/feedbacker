<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import Copy from './Copy.vue'
import Loading from './Loading.vue'

export default {
  components: { Copy, Loading },
  props: {
    name: { type: String, required: true }
  }
}
</script>
