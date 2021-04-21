<template>
  <div
    :style="{ width: computedWidth, height }"
    class="opacity-75 content-loader"
  >
    <span :style="{ animationDuration }" class="content-loader--fx"></span>
    <!-- conteúdo passado dentro de content-loader -->
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    maxWidth: {
      type: Number,
      default: 100
    },
    minWidth: {
      type: Number,
      default: 80
    },
    animationDuration: {
      type: String,
      default: '1.6s'
    },
    height: {
      type: String,
      default: '1rem'
    },
    width: {
      type: String,
      default: '1rem'
    }
  },
  setup (props) {
    const computedWidth = computed(() => {
      const value = Math.random() * (props.width - props.minWidth)
      return props.width ?? `${Math.floor(value - props.minWidth)}%`
    })

    return {
      computedWidth
    }
  }
}
</script>

<style lang="css" scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
.content-loader {
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  background: #f6f7f8;
}
.content-loader--fx {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: #f6f7f8;
  background-image: linear-gradient(to right, #eee 8%, #ddd 18%, #eee 33%);
  background-position: 0 0;
  background-size: 1000 100;
  animation: shimmer infinite alternate ease-in-out;
}
</style>
