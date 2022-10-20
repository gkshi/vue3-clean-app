<script lang="ts" setup>
// import { useStore } from '@/stores'
import UIButton from '@/components/ui/UIButton.vue'

// const store = useStore()
const openExampleModal = () => {
  console.log('openExampleModal')
}
</script>

<template>
  <div class="page -home">
    <div class="container -wide">
      <h1>Home page</h1>
      <div>home page content</div>
      <div>
        <UIButton @click="openExampleModal">Open example modal</UIButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page.-home {
  //
}
</style>
