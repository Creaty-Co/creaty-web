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
        "@interfaces": path.resolve(__dirname, "./src/interfaces"),
        "@modules": path.resolve(__dirname, "./src/modules"),
        "@redux": path.resolve(__dirname, "./src/redux"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@i18n": path.resolve(__dirname, "./src/i18n"),
        "@app": path.resolve(__dirname, "./src/app"),
        "@api": path.resolve(__dirname, "./src/api"),
        "@src": path.resolve(__dirname, "./src"),

        /* FSD structure */
        "@features": path.resolve(__dirname, "./src/features"),
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