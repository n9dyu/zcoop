/** @type {import('tailwindcss').Config} */

module.exports = {
  
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        red: '#A20100',
        white: '#FFFFFF',
        black: "#241C1C"
      },
      
      fontFamily: {
        bop: ['bop'],
        coolvetica: ['coolvetica'],
        poppins: ['poppins']
      }
    },
  },
  plugins: [],
  
}