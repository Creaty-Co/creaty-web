import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"
import envCompatible from "vite-plugin-env-compatible"
import eslint from "vite-plugin-eslint"


const ENV_PREFIX = "REACT_APP_"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [envCompatible({ prefix: ENV_PREFIX }), react(), eslint()],
    resolve: {
      alias: {
        /* FSD structure */
        "@app": path.resolve(__dirname, "./src/app"),
        "@i18n": path.resolve(__dirname, "./src/i18n"),
        "@entities": path.resolve(__dirname, "./src/entities"),
        "@features": path.resolve(__dirname, "./src/features"),
        "@widgets": path.resolve(__dirname, "./src/widgets"),
        "@shared": path.resolve(__dirname, "./src/shared"),
        "@pages": path.resolve(__dirname, "./src/pages"),
      },
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: "build",
    },
  }
})