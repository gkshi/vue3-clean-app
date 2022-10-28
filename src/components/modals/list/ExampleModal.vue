<script setup lang="ts">
import ModalWrapper from '@/components/modals/ModalWrapper.vue'

const onBeforeOpen = () => console.log('example onBeforeOpen')
const onOpened = () => console.log('example onOpened')
const onBeforeClose = () => console.log('example onBeforeClose')
const onClosed = () => console.log('example onClosed')
</script>

<template>
  <ModalWrapper
      id="example"
      @beforeOpen="onBeforeOpen"
      @opened="onOpened"
      @beforeClose="onBeforeClose"
      @closed="onClosed"
  >
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
