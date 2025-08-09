<template>
    <v-row>
      <v-col cols="12" md="4">
        <h2>Login</h2>
        <form>
          <v-text-field v-model="email" :counter="20" label="email" required></v-text-field>
          <v-text-field v-model="password" label="password" required :type="show1 ? 'text' : 'password'"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1"></v-text-field>
          <v-btn class="mr-4" @click="login">submit</v-btn>
          <p v-if="error" class="errors">{{ error }}</p>
        </form>
      </v-col>
    </v-row>
  </template>
  
  <script>
    export default {
      data() {
        return {
          email: "",
          password: "",
          show1: false,
          error: null,
        };
      },
      methods: {
        async login() {
          try {
            this.error = null;
            const { $firebase } = useNuxtApp();
            const { signInWithEmailAndPassword } = await import('firebase/auth');
            
            await signInWithEmailAndPassword($firebase.auth(), this.email, this.password);
            
            this.$router.push("/");
          } catch (error) {
            switch (error.code) {
              case "auth/user-not-found":
                this.error = "メールアドレスが間違っています";
                break;
              case "auth/wrong-password":
                this.error = "※パスワードが正しくありません";
                break;
              case "auth/invalid-email":
                this.error = "※正しいメールアドレス形式で入力してください";
                break;
              default:
                this.error = "※メールアドレスとパスワードをご確認ください";
                break;
            }
          }
        },
      },
    };
  
  </script>
  
  <style scoped>
    .errors {
      color: red;
      margin-top: 20px;
    }
  
  </style>
  
  