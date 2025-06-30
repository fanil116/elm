import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    key: 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie',
    hostUrl: 'http://109.73.206.144:6969'
  }),
  getters: {
    getKey() {
      return this.key
    },
    getHostUrl() {
      return this.hostUrl
    }
  }
})