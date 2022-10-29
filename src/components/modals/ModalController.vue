<script setup lang="ts">
import { computed, watch } from 'vue'
import { useModals } from '@/stores/modals'

// modals
import ExampleModal from './list/ExampleModal.vue'

const $modals = useModals()
const show = computed(() => $modals.state.openedModals.length)

const enableKeyupListener = () => {
  window.onkeyup = (e) => {
    if (e.key === 'Escape') {
      $modals.closeLast()
    }
  }
}

const disableKeyupListener = () => {
  window.onkeyup = null
}

watch(show, active => {
  active
    ? enableKeyupListener()
    : disableKeyupListener()
})

const onBackgroundClick = () => {
  $modals.closeLast()
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-controller" @click.self="onBackgroundClick">
      <!-- modal list here -->
      <ExampleModal/>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import "src/assets/scss/variables";

.modal-controller {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba($color-dark, .5);
  padding: 40px 0 40px;
  overflow: auto;
  transition: opacity .2s ease;
}
</style>

<style lang="scss">
body {
  &.-modal-opened {
    overflow: hidden;

    .layout {
      & > *:not(.modal-controller) {
        transition: filter .2s ease;
        filter: blur(3px);
      }
    }
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from {
  .modal {
    transform: scale(.95);
  }
}
</style>
