<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import ChevronDown from './ChevronDown'
import Copy from './Copy.vue'
import Loading from './Loading.vue'

export default {
  components: { ChevronDown, Copy, Loading },
  props: {
    name: { type: String, required: true }
  }
}
</script>
