// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv', 
  ],
  server: {
    port: 8080 
  },
})