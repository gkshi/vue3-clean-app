import { reactive } from 'vue'
import { defineStore } from 'pinia'

type ModalID = string

const addBodyClass = () => {
  !document.body.classList.contains('-modal-opened') && document.body.classList.add('-modal-opened')
}
const removeBodyClass = () => {
  document.body.classList.contains('-modal-opened') && document.body.classList.remove('-modal-opened')
}

export const useModals = defineStore('modals', () => {
  const state = reactive({
    openedModals: [] as ModalID[]
  })

  const open = (modalID: ModalID) => {
    addBodyClass()
    state.openedModals = [...state.openedModals, modalID]
  }

  const close = (modalID: ModalID) => {
    state.openedModals = state.openedModals.filter(i => i !== modalID)
    if (!state.openedModals.length) {
      removeBodyClass()
    }
  }

  const closeLast = () => {
    state.openedModals = state.openedModals.slice(0, -1)
    if (!state.openedModals.length) {
      removeBodyClass()
    }
  }

  const closeAll = () => {
    state.openedModals = []
    removeBodyClass()
  }

  const isOpened = (modalID: ModalID) => {
    return state.openedModals.includes(modalID)
  }

  return { state, open, close, closeLast, closeAll, isOpened }
})
