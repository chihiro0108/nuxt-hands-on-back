import firebase from "firebase/compat/app"
import "firebase/compat/auth"

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const fbConfig = {
    apiKey: config.public.apiKey,
    authDomain: config.public.authDomain,
    projectId: config.public.projectId,
  }
  
  if (!firebase.apps.length) {
    firebase.initializeApp(fbConfig)
  }
  
  return {
    provide: {
      firebase
    }
  }
})
