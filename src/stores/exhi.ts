import { defineStore } from 'pinia'

export const useExhiStore = defineStore('exhi', {
    state: () => {
        return {
            exhi: {
                title: ''
            }
        }
    },
    getters: {},
    actions: {}
})
