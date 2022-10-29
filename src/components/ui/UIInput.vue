<script lang="ts" setup>
import { ref, computed, useSlots, nextTick, onBeforeMount } from 'vue'

interface Props {
  id?: string,
  name?: string,
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
const slots = useSlots()
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  theme: 'default',
  size: 'default',
  autocomplete: true
})
const fieldID = ref(props.id)

// clean field props for the input html tag
const fieldProps = () => {
  const arr = { ...props } as Props
  delete arr.theme
  delete arr.size
  delete arr.autocomplete
  if (props.autocomplete === false || props.autocomplete === 'off') {
    arr.autocomplete = 'off'
  }
  if (slots.default) {
    arr.id = fieldID.value
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

onBeforeMount(() => {
  // Setting a random ID value if it was not passed as prop.
  // It is placed in onBeforeMount hook, so every vue component instance will have a unique value
  fieldID.value = fieldID.value || Math.random().toFixed(10).slice(2)
})

defineExpose({
  focus
})
</script>

<template>
  <div :class="`component -ui -input  ${isFilled ? '-filled' : ''} ${props.disabled ? '-disabled' : ''}`">
    <label v-if="!!slots.default" :for="fieldID">
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
@import "src/assets/scss/variables";

.component.-ui.-input {
  label {
    display: block;
  }

  input {
    display: block;
    width: 100%;
    border: none;
    background: $color-field-bg;
    font-family: $font-family-default;
    font-size: $font-size-regular;
    line-height: $line-height-regular;
    padding: 20px 24px;
    border-radius: $border-radius-field;
  }

  &.-filled {
    //
  }

  &.-disabled {
    //
  }
}
</style>
