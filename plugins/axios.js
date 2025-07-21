import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
  })
  nuxtApp.provide('axios', axiosInstance)
})
