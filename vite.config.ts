import react from "@vitejs/plugin-react"
import autoprefixer from "autoprefixer"
import path from "path"
import { defineConfig } from "vite"
import envCompatible from "vite-plugin-env-compatible"
import eslint from "vite-plugin-eslint"

const ENV_PREFIX = "REACT_APP_"

export default defineConfig(() => {
  return {
    plugins: [envCompatible({ prefix: ENV_PREFIX }), react(), eslint()],
    resolve: {
      alias: {
        "@i18n": path.resolve(__dirname, "./src/i18n"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@shared": path.resolve(__dirname, "./src/shared"),
        "@types": path.resolve(__dirname, "./src/shared/types"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@app": path.resolve(__dirname, "./src/app"),
        "@components": path.resolve(__dirname, "./src/components"),
      },
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: "build",
    },
    css: {
      postcss: {
        plugins: [autoprefixer()],
      },
    },
  }
})
