<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, useSlots } from 'vue'
import { useModals } from '@/stores/modals'

import CrossIcon from '@/components/icons/CrossIcon.vue'

interface Props {
  id: string,
  size?: 'default' | 'wide' | 'narrow'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default'
})
const $modals = useModals()
const slots = useSlots()
const emit = defineEmits(['beforeOpen', 'opened', 'beforeClose', 'closed'])

const animationDelay = 200 // Sync this value with transition property in styles below

const show = computed(() => $modals.isOpened(props.id))

const close = () => $modals.close(props.id)

onBeforeMount(() => {
  emit('beforeOpen')
})
onMounted(() => {
  setTimeout(() => emit('opened'), animationDelay)
})
onBeforeUnmount(() => {
  emit('beforeClose')
})
onUnmounted(() => {
  emit('closed')
})
</script>

<template>
  <div class="component -modal-wrapper">
    <template v-if="show">
      <dialog :class="`modal -size-${props.size}`" :data-modal-id="props.id" :open="show">
        <a class="close flex center" href="#" @click.prevent="close">
          <CrossIcon/>
        </a>

        <template v-if="slots.header().length">
          <div class="header">
            <slot name="header"/>
          </div>
        </template>

        <div class="main">
          <slot/>
        </div>

        <template v-if="slots.footer().length">
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </template>
      </dialog>

      <div class="space" @click="close"></div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/scss/variables";
@import "src/assets/scss/typography";

.component.-modal-wrapper {
  max-height: 100%;

  .modal {
    position: relative;
    z-index: 1;
    padding: 30px 50px 40px;
    background: $color-modal-bg;
    color: $color-text-regular;
    border: none;
    border-radius: $border-radius-modal;
    box-shadow: $box-shadow-default;

    // Transition duration value is using in the script as emit delay
    // Sync this value with "animationDelay" constant above
    transition: transform .2s ease, opacity .2s ease;

    .close {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      width: 48px;
      height: 48px;
      color: rgba($color-text-dark, .25);
      text-decoration: none;

      &:hover {
        color: $color-text-dark;
      }
    }

    .header {
      @extend %h4;
      margin-bottom: 30px;
    }

    .footer {
      margin-top: 20px;
    }

    &.-size {
      &-default {
        width: 480px;
      }
    }
  }

  .space {
    display: block;
    width: 100%;
    height: 40px;
    background: transparent;
  }
}
</style>
