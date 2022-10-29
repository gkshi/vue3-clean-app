<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useModals } from '@/stores/modals'

import UIButton from '@/components/ui/UIButton.vue'
import UIInput from '@/components/ui/UIInput.vue'
import UICheckbox from '@/components/ui/UICheckbox.vue'

const $modals = useModals()
const fieldValue = ref('')
const checkboxValue = reactive({
  single: true,
  group: ['value2']
})

const openExampleModal = () => {
  $modals.open('example')
}
</script>

<template>
  <div class="page -home">
    <div class="container -wide">
      <h1>Home page</h1>

      <section>Default Layout -> Home page view</section>

      <section>
        <h6>UI Button</h6>
        <UIButton size="small" @click="openExampleModal">Open example modal</UIButton>
      </section>

      <section>
        <h6>UI Input</h6>
        <div>value: {{ fieldValue || '-' }}</div>
        <UIInput
            v-model="fieldValue"
            placeholder="Custom placeholder"
            autofocus
        >Field label</UIInput>
      </section>

      <section>
        <h6>UICheckbox</h6>
        <div>value: {{ checkboxValue }}</div>
        <div style="margin-bottom: 8px;">
          <UICheckbox v-model="checkboxValue.single">
            single checkbox
          </UICheckbox>
        </div>
        <div>
          <UICheckbox v-model="checkboxValue.group" value="value1">
            group checkbox1
          </UICheckbox>
          <UICheckbox v-model="checkboxValue.group" value="value2">
            group checkbox2
          </UICheckbox>
          <UICheckbox v-model="checkboxValue.group" value="value3">
            group checkbox3
          </UICheckbox>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page.-home {
  section {
    margin: 20px auto;
  }
}
</style>
