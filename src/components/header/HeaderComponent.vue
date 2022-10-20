<script lang="ts" setup>
import { RouterLink } from 'vue-router'

import LogoIcon from '@/components/icons/LogoIcon.vue'
</script>

<template>
  <header class="component -header">
    <div class="container -wide flex a-center">
      <div>
        <LogoIcon />
      </div>

      <nav>
        <RouterLink to="/">home</RouterLink>
        <RouterLink to="/about">about</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.component.-header {
  //
}
</style>
