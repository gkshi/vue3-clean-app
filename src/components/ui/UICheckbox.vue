<script setup lang="ts">
import { computed, ref } from 'vue'

import IconCheck from '@/components/icons/CheckIcon.vue'

interface Props {
  id?: string,
  modelValue?: any,
  value?: any,
  name?: string,
  checked?: boolean,
  required?: boolean,
  disabled?: boolean
}

const _ref = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['update:modelValue', 'change'])
const props = withDefaults(defineProps<Props>(), {
  id: Math.random().toFixed(10).slice(2),
  name: Math.random().toFixed(10).slice(2)
})

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  } else {
    return !!props.modelValue
  }
})

const onChange = (e: any) => {
  if (Array.isArray(props.modelValue)) {
    switch (e.target.checked) {
      case true:
        emit('update:modelValue', [...props.modelValue, props.value])
        break
      case false:
        emit('update:modelValue', props.modelValue.filter(i => i !== props.value))
        break
    }
  } else {
    emit('update:modelValue', e.target.checked)
  }
  emit('change', e)
}
</script>

<template>
  <div :class="`component -ui -checkbox ${isChecked ? '-checked' : ''} ${props.disabled ? '-disabled' : ''}`">
    <label class="flex">
      <input
          ref="_ref"
          type="checkbox"
          v-bind="props"
          :value="props.value"
          :checked="isChecked"
          @change="onChange"
      >

      <span class="inline-flex a-center">
        <span class="label">
          <slot></slot>
        </span>

        <span class="box flex center">
          <IconCheck/>
        </span>
      </span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/scss/variables";

.component.-ui.-checkbox {
  input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
  }

  .box {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: $border-radius-checkbox;
    background: $color-checkbox-bg;
    color: $color-text-white;
    cursor: pointer;
    user-select: none;
    transition: $transition-default;

    & > * {
      transition: $transition-default;
      transform: scale(0);
    }
  }

  .label {
    order: 2;
    font-size: $font-size-regular;
    line-height: $line-height-regular;

    &:empty + .box {
      margin-right: 0;
    }
  }

  &.-checked {
    .box {
      background: $color-checkbox-active;

      & > * {
        transform: scale(1);
      }
    }
  }

  &:not(.-checked) {
    label {
      &:hover {
        .box {
          background: darken($color-checkbox-bg, 4%);
        }
      }
    }
  }

  &.-disabled {
    opacity: .5;

    label,
    .box {
      cursor: default;
    }
  }
}
</style>
