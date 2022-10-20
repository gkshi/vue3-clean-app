<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const layout = computed(() => {
  return `layout-${router.currentRoute?.value?.meta?.layout || 'default'}`
})
</script>

<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<style lang="scss" scoped>
#app {
  //
}
</style>
