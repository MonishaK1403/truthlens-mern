/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effcf9",
          100: "#c9f6ec",
          200: "#94ecd9",
          300: "#5adcc2",
          400: "#2ec4a8",
          500: "#14a892",
          600: "#0f8a78",
          700: "#0d7063",
          800: "#0c584f",
          900: "#0a4842",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
