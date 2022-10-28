<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'

interface Props {
  id?: string,
  type?: string,
  modelValue: string | number,
  autocomplete?: boolean | string,
  autofocus?: boolean,
  placeholder?: string,
  readonly?: boolean,
  required?: boolean,
  disabled?: boolean,
  theme?: 'default' | 'alternative', // field themes
  size?: 'default' | 'small', // field sizes
}

const _ref = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['update:modelValue', 'input'])
const props = withDefaults(defineProps<Props>(), {
  id: Math.random().toFixed(10).slice(2),
  type: 'text',
  theme: 'default',
  size: 'default',
  autocomplete: true
})

// clean field props for the input html tag
const fieldProps = () => {
  const arr = { ...props } as Props
  delete arr.theme
  delete arr.size
  delete arr.autocomplete
  if (props.autocomplete === false || props.autocomplete === 'off') {
    arr.autocomplete = 'off'
  }
  return arr
}

const isFilled = computed(() => !!props.modelValue)

const focus = () => {
  nextTick(() => _ref.value?.focus())
}

const onInput = (e: any) => {
  emit('update:modelValue', e.target.value)
  emit('input', e)
}

const onChange = (e: any) => {
  emit('update:modelValue', e.target.value)
}

defineExpose({
  focus
})
</script>

<template>
  <div :class="`component -ui -input  ${isFilled ? '-filled' : ''} ${props.disabled ? '-disabled' : ''}`">
    <label :for="props.id">
      <slot/>
    </label>

    <input
        ref="_ref"
        v-bind="fieldProps()"
        :value="props.modelValue"
        @input="onInput"
        @change="onChange"
    >
  </div>
</template>

<style lang="scss" scoped>
.component.-ui.-input {
  label {
    display: block;
  }

  input {
    display: block;
  }

  &.-filled {
    //
  }

  &.-disabled {
    //
  }
}
</style>
