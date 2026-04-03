// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/scss/main.scss"],
  modules: ["@nuxtjs/google-fonts", "@nuxt/icon", "@nuxt/image", "@vueuse/nuxt"],
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
      Roboto: "200..700",
    },
    display: "swap",
  },
  icon: {
    provider: "server",
    customCollections: [
      {
        prefix: "my-icon",
        dir: "./app/assets/icons/",
        recursive: true,
      },
    ],
    clientBundle: {
      includeCustomCollections: true, // This option is key
    },
  },
});