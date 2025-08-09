import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const fbConfig = {
    apiKey: config.public.apiKey,
    authDomain: config.public.authDomain,
    projectId: config.public.projectId,
  }
  
  // Initialize Firebase
  let app
  if (!getApps().length) {
    app = initializeApp(fbConfig)
  } else {
    app = getApps()[0]
  }
  
  const auth = getAuth(app)
  
  return {
    provide: {
      firebase: {
        auth: () => auth
      }
    }
  }
})
