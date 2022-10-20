import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('index', () => {
  const state = reactive({
    //
  })

  return { state }
})
