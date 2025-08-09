export default defineNuxtPlugin(async () => {
  if (process.client) {
    // Firebaseプラグインが初期化されるまで待つ
    await nextTick();
    
    const { $firebase, $axios } = useNuxtApp();
    
    if ($firebase && $firebase.auth && $axios) {
      console.log('Firebase and axios are available');
      const { onAuthStateChanged } = await import('firebase/auth');
      onAuthStateChanged($firebase.auth(), async user => {
        console.log('Auth state changed:', user);
        if (user) {
          console.log('User is logged in:', user.uid);
          try {
            const { data } = await $axios.get('/v1/users', {
              params: {
                uid: user.uid,
              },
            });
            console.log("ログインしているユーザー:", data);
            const authStore = useAuthStore();
            // APIが配列を返している場合、最初の要素を使用
            const userData = Array.isArray(data) ? data[0] : data;
            console.log('Setting user in store:', userData);
            authStore.setUser(userData);
          } catch (error) {
            console.error("ユーザー情報取得エラー:", error);
          }
        } else {
          console.log("ユーザーがログアウトしました");
          const authStore = useAuthStore();
          authStore.clearUser();
        }
      });
    } else {
      console.error('Firebase or axios not available:', { firebase: !!$firebase, auth: !!$firebase?.auth, axios: !!$axios });
    }
  }
});
