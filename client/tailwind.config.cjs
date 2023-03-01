module.exports = {
  mode: "jit",
  content: [
    "./components/**/*.{js,jsx}",
    "./dist/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        header: {
          1: "#33CCC5",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
