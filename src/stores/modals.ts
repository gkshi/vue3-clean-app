import { nextTick, reactive } from 'vue'
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
    openedModals: [] as ModalID[],
    modalData: null as any
  })

  const open = (modalID: ModalID, data?: any) => {
    addBodyClass()
    nextTick(() => {
      state.openedModals = [...state.openedModals, modalID]
      state.modalData = data !== undefined ? data : null
    })
  }

  const close = (modalID: ModalID) => {
    state.openedModals = state.openedModals.filter(i => i !== modalID)
    state.modalData = null
    if (!state.openedModals.length) {
      removeBodyClass()
    }
  }

  const closeLast = () => {
    state.openedModals = state.openedModals.slice(0, -1)
    state.modalData = null
    if (!state.openedModals.length) {
      removeBodyClass()
    }
  }

  const closeAll = () => {
    state.openedModals = []
    state.modalData = null
    removeBodyClass()
  }

  const isOpened = (modalID: ModalID) => {
    return state.openedModals.includes(modalID)
  }

  return { state, open, close, closeLast, closeAll, isOpened }
})
