import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        screen1600: { max: "1600px" },
        screen1440: { max: "1440px" },
        screen1400: { max: "1400px" },
        screen1350: { max: "1350px" },
        screen1250: { max: "1250px" },
        screen1200: { max: "1200px" },
        screen1150: { max: "1150px" },
        screen1100: { max: "1100px" },
        screen1050: { max: "1050px" },
        screen980: { max: "980px" },
        screen900: { max: "900px" },
        screen850: { max: "850px" },
        screen800: { max: "800px" },
        screen750: { max: "750px" },
        screen660: { max: "660px" },
        screen600: { max: "600px" },
        screen550: { max: "550px" },
        screen500: { max: "500px" },
        screen450: { max: "450px" },
        screen400: { max: "400px" },
        screen350: { max: "350px" },
      },
    },
  },
  plugins: [],
} satisfies Config;
