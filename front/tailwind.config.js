/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    colors: {
      'black': '#000000',
      'white': "#FFFFFF",
      'green': "#B0DEE1",
      'greenfocus': "#65ABAF",
      'blue': "#9AC8EB",
      'yellowflash' : "#F4F066",
      'yellow': "#F7F6CF",
      'pinkflash' : "#DD92D1",
      'pink' : "#F4CFDF",
      'grey': "#D9D9D9",
      'greysoft': "#EAEAEA",
      'bluesoft': "#BED8EC",
      'purplesoft': "#D3D4FB",
      'purple': "#B6B8F2",
    },
    fontFamily: {
      inika: ["inika", "serif"],
    },
    extend: {},
  },
  plugins: [],
}

