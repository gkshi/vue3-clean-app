<script lang="ts" setup>
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
import ModalController from '@/components/modals/ModalController.vue'
</script>

<template>
  <div class="layout -default">
    <HeaderComponent />

    <main>
      <slot/>
    </main>

    <FooterComponent/>

    <ModalController/>
  </div>
</template>

<style lang="scss" scoped>
.layout.-default {
  min-height: 100vh;
}
</style>
