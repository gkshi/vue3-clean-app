<script lang="ts" setup>
import { ref, computed, useSlots, nextTick, onBeforeMount } from 'vue'

interface Props {
  id?: string,
  name?: string,
  type?: string,
  modelValue: string | number,
  autocomplete?: 'on' | 'off',
  autofocus?: boolean,
  placeholder?: string,
  readonly?: boolean,
  required?: boolean,
  disabled?: boolean,
  pattern?: string,
  theme?: 'default' | 'alternative', // field themes
  size?: 'default' | 'small', // field sizes
  error?: string | boolean // error text
}

const _ref = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['update:modelValue', 'input'])
const slots = useSlots()
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  theme: 'default',
  size: 'default'
})
const fieldID = ref(props.id)

// clean field props for the input html tag
const fieldProps = () => {
  const arr = { ...props } as Props
  delete arr.theme
  delete arr.size
  delete arr.error
  if (slots.default) {
    arr.id = fieldID.value
  }
  return arr
}

const classList = computed(() => `component -ui -input -size-${props.size} -theme-${props.theme} ${isFilled.value ? '-filled' : ''} ${props.disabled ? '-disabled' : ''} ${props.error ? '-error' : ''}`)
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
  <div :class="classList">
    <label v-if="!!slots.default" :for="fieldID">
      <slot/>
    </label>

    <input
        ref="_ref"
        v-bind="fieldProps()"
        :value="props.modelValue"
        @input="onInput"
        @change="onChange"
    />

    <div v-if="props.error && typeof props.error === 'string'" class="error-text">
      {{ props.error }}
    </div>
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
    font-family: $font-family-default;
    transition: $transition-field;
  }

  &.-theme {
    &-default {
      input {
        background: $color-field-bg;

        &:hover {
          background: darken($color-field-bg, 2%);
        }
        &:focus {
          background: darken($color-field-bg, 2%);
        }
      }
    }

    &-alternative {
      input {
        //
      }
    }
  }

  &.-size {
    &-default {
      input {
        font-size: $font-size-regular;
        line-height: $line-height-regular;
        padding: 20px 24px;
        border-radius: $border-radius-field;
      }
    }

    &-small {
      input {
        //
      }
    }
  }

  &.-filled {
    //
  }

  &.-disabled {
    //
  }

  &.-error {
    input {
      border-color: $color-danger;
      &:hover,
      &:focus {
        border-color: $color-danger;
      }
    }
  }
}
</style>
