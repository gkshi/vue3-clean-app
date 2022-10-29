<script setup lang="ts">
import { computed, ref, onBeforeMount } from 'vue'

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
const props = defineProps<Props>()
const fieldID = ref(props.id)

const fieldProps = () => {
  const arr = { ...props }
  delete arr.modelValue
  delete arr.checked
  return arr
}

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  } else {
    return !!props.modelValue
  }
})

const onBoxClick = () => {
  _ref.value && _ref.value.click()
}

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

onBeforeMount(() => {
  // Setting a random ID value if it was not passed as prop.
  // It is placed in onBeforeMount hook, so every vue component instance will have a unique value
  fieldID.value = fieldID.value || Math.random().toFixed(10).slice(2)
})
</script>

<template>
  <div :class="`component -ui -checkbox ${isChecked ? '-checked' : ''} ${props.disabled ? '-disabled' : ''}`">
    <input
        type="checkbox"
        v-bind="fieldProps()"
        :id="fieldID"
        :value="props.value"
        :checked="isChecked"
        @change="onChange"
    >

    <span class="intro inline-flex a-center">
        <label :for="fieldID" ref="_ref">
          <slot></slot>
        </label>

        <span class="box flex center" @click="onBoxClick">
          <IconCheck/>
        </span>
      </span>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/scss/variables";

$checkbox-width: 24px;
$checkbox-height: $checkbox-width;

.component.-ui.-checkbox {
  position: relative;

  input {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: $checkbox-width;
    height: $checkbox-height;
    z-index: -1;
    opacity: 0;
  }

  .box {
    flex-shrink: 0;
    width: $checkbox-width;
    height: $checkbox-height;
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

  label {
    order: 2;
    font-size: inherit;
    line-height: inherit;
    cursor: pointer;

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
    .intro {
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
