import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa"
import { quasar, transformAssetUrls } from "@quasar/vite-plugin"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
    template: { transformAssetUrls },
  }),
  quasar({
    sassVariables: "src/quasar-variables.sass",
  }),
    VitePWA({
      devOptions: {
        enabled: true
      },
      mode: "development",
      registerType: "autoUpdate",
      base: "/",
      srcDir: "src",
      filename: "sw.ts",
      includeAssets: ["/favicon.png"],
      strategies: "injectManifest",
      manifest: {
        prefer_related_applications: true,
        name: "Simpel Ajo",
        short_name: "simpelajo",
        theme_color: "#ef9273",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
