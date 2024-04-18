/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1024px",
      "2xl": "1280px",
      "3xl": "1440px",
    },
    extend: {
      colors: {
        darkBrown: "#D27838",
        veryDarkBrown: "#935b27",
        darkBrownHover: "#a25925",
        veryLightBrown: "#ffe7d0",
        lightBrown: "#ffcfa2",
        brownishWhite: "#FDF5EB",
        footerTextGrey: "#85888D",
        greyBorder: "#E1E1E1",
        greyTextColor: "#85888D",
        secondLightBrown: "#fdecdc",
        disabledBrown: "#c89977"

      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
