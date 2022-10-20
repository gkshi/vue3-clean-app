<script lang="ts" setup>
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
</script>

<template>
  <div class="layout -default">
    <HeaderComponent />

    <main>
      <slot/>
    </main>

    <FooterComponent/>
  </div>
</template>

<style lang="scss" scoped>
.layout.-default {
  //
}
</style>
