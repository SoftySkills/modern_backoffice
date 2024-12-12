/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-blue-1": "#0080DF",
        "color-blue-2": "#2860D7",
        "color-blue-3": "#5590f5",
        "color-blue-4": "#EFF7FE",

        "bg-auth-pages": "#EBEBFF",
        "bg-dashboard-pages": "#F5FAFF",

        "black-1": "#000030BF",
      },
    },
  },
  plugins: [],
};
