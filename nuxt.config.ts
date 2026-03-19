// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  modules: ['@nuxtjs/google-fonts'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_mixins.scss" as *;',
        },
      },
    },
  },
  googleFonts: {
    families: {
      Roboto: '200..700',
    },
    display: 'swap',
  },
});
