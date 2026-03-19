import { join } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  modules: ['@nuxtjs/google-fonts', '@nuxtjs/svg-sprite'],
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
  svgSprite: {
		input: '~/src/assets/sprite/svg',
		output: '~/src/assets/sprite/gen'
	},
});
