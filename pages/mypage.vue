<template>
    <div>
      <div v-if="user">
        <p>Email: {{ user.email }}</p>
        <p>名前: {{ user.name }}</p>
      </div>
      <v-btn @click="logOut">LOGOUT</v-btn>
    </div>
  </template>
  
  <script>
    import { mapState } from 'pinia';
    import { useAuthStore } from '@/stores/auth';

    export default {
      computed: {
        ...mapState(useAuthStore, ['currentUser']),
        user() {
          return this.currentUser;
        },
      },
      methods: {
        async logOut() {
          try {
            const { $firebase } = useNuxtApp();
            const { signOut } = await import('firebase/auth');
            await signOut($firebase.auth());

            const authStore = useAuthStore();
            authStore.clearUser();
            
            this.$router.push("/login");
          } catch (error) {
            console.error("ログアウトエラー:", error);
          }
        },
      },
    };

  </script>
  
  <style>
  </style>
  