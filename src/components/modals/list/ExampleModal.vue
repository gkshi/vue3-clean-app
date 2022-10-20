<script setup lang="ts">
import ModalWrapper from '../ModalWrapper.vue'
</script>

<template>
  <ModalWrapper id="example">
    <template #header>
      Example modal
    </template>

    <div>
      Modal content
    </div>

    <template #footer>
      Modal footer
    </template>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
//
</style>
