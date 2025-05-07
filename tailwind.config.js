/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#000000",
          secondary: "#111111",
          tertiary: "#222222",
          quaternary: "#333333",
          quinary: "#444444",
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          serif: ["Merriweather", "serif"],
          mono: ["Space Mono", "monospace"],
        },
      },
    },
    plugins: [],
  }
