import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "nunito-sans": "--font-nunito-sans",
      },
      fontSize: {
        home: "14px",
        details: "16px",
      },
      colors: {
        "dark-blue": "hsl(209, 23%, 22%)", // for dark theme elements
        "light-mode-text": "hsl(200, 15%, 8%)", // light mode text
        "dark-bg": "hsl(207, 26%, 17%)", // dark mode background
        "dark-gray": "hsl(0, 0%, 52%)",
        "very-light-dark-gray": "hsl(0, 0%, 98%)",
        white: "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
