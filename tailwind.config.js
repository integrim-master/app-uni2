/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        golden: {
          dark: '#D4AF37',
          light: '#FBF7EB',
          blackPage: '#3D3D3D'
        },
      },
      fontFamily: {
        poppins: ["poppins-regular"],
        poppinsSemibold: ["poppins-semibold"],
        poppinsBold: ["poppins-bold"],
      },
    },
  },
  plugins: [],
}
