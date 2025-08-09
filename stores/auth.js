import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null
  }),
  
  actions: {
    setUser(user) {
      this.currentUser = user
    },
    
    clearUser() {
      this.currentUser = null
    }
  },
  
  getters: {
    isAuthenticated: (state) => !!state.currentUser
  }
})