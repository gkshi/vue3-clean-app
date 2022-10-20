<script lang="ts" setup>
import { useModals } from '@/stores/modals'
import UIButton from '@/components/ui/UIButton.vue'

const $modals = useModals()

const openExampleModal = () => {
  $modals.open('example')
}
</script>

<template>
  <div class="page -home">
    <div class="container -wide">
      <h1>Home page</h1>
      <div>home page content</div>
      <div>
        <UIButton size="small" @click="openExampleModal">Open example modal</UIButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page.-home {
  //
}
</style>
