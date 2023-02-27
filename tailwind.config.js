/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Google Sans", "sans-serif"],
      serif: ["Google Sans", "serif"],
    },

    colors: {
      "gray-text": "#AEABBA",
      "black-main": "#000000",
      "gray-main": "#808080",
      "white": "#FFFFFF",
      "dark": "#000000",
      
      "gray": {
        100: "#F3F6FB",
        200: "#F3F6FB",
        300: "#EEF2F7",
        350: "#E8EEF4",
        400: "#c8cad3",
        500: "#9699A5",
        800: "#595F69",
        900: "#434752",
        1000: "#272A30"
      },

      "black": {
        300: "#2C2E33",
        900: "#131417",
        1000: "#070707"
      },

      "green": {
        300: "#4DF971",
        700: "#0FAB60"
      },

      "violet": "#6610EB",
      "blue": "#4eb4f9",
      "red": "#FF3434"
    },

    /* borderRadius: {
      "sm": "20px",
      "lg": "22px",
      "xl": "24px",
    }, */
    extend: {
      fontFamily: {
        sans: ["Google Sans", "sans-serif"],
        serif: ["Google Sans", "serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
