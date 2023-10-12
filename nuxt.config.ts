import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'frog.dev',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'a ribbeting development log' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' }
      ]
    },
  },
  hooks: {
    "vite:extendConfig"(config, { isClient }) {
      if (process.env.NODE_ENV !== "development" && isClient) {
        // rc6
        // @ts-ignore
        config.build.rollupOptions.output.chunkFileNames = "_nuxt/[hash].js"
        // @ts-ignore
        config.build.rollupOptions.output.entryFileNames = "_nuxt/[hash].js"
      }
    },
  },
  css: [
    'assets/css/main.scss'
  ],
  modules: [
    '@nuxt/content',
    'unplugin-icons/nuxt'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "assets/css/variables.scss";'
        }
      }
    },
    resolve: {
      extensions: ['.js','.mjs', '.vue', '.html']
    }
  },
  content: {
    highlight: {
      theme: 'github-light',
      preload: [
        // 'js',
        // 'css',
        // 'shell',
        // 'scss',
        // 'vue-html',
        // 'vue',
        // 'cpp'
      ]
    }
  }
})
