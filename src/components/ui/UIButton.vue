<script lang="ts" setup>
import { RouterLink } from 'vue-router'

interface Props {
  to?: string,
  href?: string,
  target?: string,
  theme?: 'default' | 'dark',
  size?: 'default' | 'small',
  type?: string, // native type attribute value
  fullWidth?: boolean,
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
  size: 'default'
})

const tagName = props && props.to ? RouterLink : props.href ? 'a' : 'button'

const classList = `component -ui -button -theme-${props.theme} -size-${props.size} ${props.fullWidth ? '-full-width' : ''} ${props.disabled ? '-disabled' : ''}`

const buttonProps = () => {
  switch (tagName) {
    case 'button':
      return {
        type: props.type
      }
    case 'a':
      return {
        href: props.href,
        target: props.target
      }
    default:
      return {
        to: props.to
      }
  }
}
</script>

<template>
  <component :is="tagName" :class="classList" v-bind="buttonProps()">
    <span class="content flex center">
      <slot />
    </span>
  </component>
</template>

<style lang="scss" scoped>
@import "src/assets/scss/variables";

.component.-ui.-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  text-decoration: none;
  font-family: $font-family-default;
  cursor: pointer;
  transition: $transition-button;
  outline: none;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
  }

  &.-size {
    &-default {
      padding: 16px 30px;
      font-size: 16px;
      line-height: 19px;
      border-radius: $border-radius-button;
    }

    &-small {
      padding: 12px 22px 13px;
      font-size: 15px;
      line-height: 18px;
      border-radius: $border-radius-button;
    }
  }

  &.-theme {
    &-default {
      background: $color-primary;
      color: $color-text-white;

      &:hover {
        background: $color-primary-highlight;
      }
    }
  }

  &.-full-width {
    width: 100%;
  }

  &.-disabled {
    pointer-events: none;
    user-select: none;
    opacity: .5;
  }
}
</style>
