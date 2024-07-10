const { default: colors } = require("./colors");

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#f57c00",
      gray: "#C5C5C7",
      mediumGray: "#F6F7FB",
      lightGray: "#FAFAFA",
      darkBackground: "#260101",
    },
  },
  plugins: [],
};
