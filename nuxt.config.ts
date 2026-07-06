
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts','@vueuse/nuxt'],
  googleFonts: {
    families: {
      Audiowide: [400, 700],
      VT323: [400, 700]
    }
  },
  tailwindcss: {
    config:{
      theme: {
        extend: {
          fontFamily: {
            heading: ['Audiowide', 'sans-serif'],
            terminal: ['VT323', 'sans-serif'],
          }
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'https://127.0.0.1:8000'
    }
  }
})
