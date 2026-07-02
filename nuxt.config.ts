// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules :['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'https://127.0.0.1:8000'
    }
  }
})
