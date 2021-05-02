<template>
  <span
    :class="`bg-${classColor}`"
    class="p-2 text-xs font-black text-white uppercase rounded-full"
    data-test="badge"
  >
    {{ label }}
  </span>
</template>

<script>
import { computed } from 'vue'
import { LABELS, COLORS } from '@/utils/constants'

export default {
  props: {
    type: { type: String, required: true }
  },
  setup (props) {
    const label = computed(() => {
      return LABELS[props.type.toLowerCase()] ?? LABELS.other
    })

    const classColor = computed(() => {
      return COLORS[props.type.toLowerCase()] ?? COLORS.other
    })

    return {
      label,
      classColor
    }
  }
}
</script>
