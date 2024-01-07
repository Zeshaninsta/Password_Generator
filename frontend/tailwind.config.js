/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    backgroundColor: {
      bgme: [
        "background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
      ],
    },
    extend: {
      keyframes: {
        animate: {
          "0%,10%,100%": {
            width: "0%",
          },
          "70%,80%,90%": {
            width: "100%",
          },
        },
      },
    },
    animation: {
      animate: "animate 2s linear infinite",
    },
  },
  plugins: [],
};
