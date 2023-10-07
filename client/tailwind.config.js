/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      width: { main: "1120px" },
      colors: {
        overlay90: "rgba(0,0,0,0.9)",
        overlay80: "rgba(0,0,0,0.8)",
        overlay70: "rgba(0,0,0,0.7)",
        overlay60: "rgba(0,0,0,0.6)",
        overlay50: "rgba(0,0,0,0.5)",
        overlay40: "rgba(0,0,0,0.4)",
        overlay30: "rgba(0,0,0,0.3)",
        overlay20: "rgba(0,0,0,0.2)",
        overlay10: "rgba(0,0,0,0.1)",
      },
      fontFamily: {
        main: ["Poppins", "sans-serif"],
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
        9: "9 9 0%",
        10: "10 10 0%",
      },
      listStyleType: {
        square: "square",
        roman: "upper-roman",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(40px);",
            transform: "translateY(40px);",
          },
          "100%": {
            "-webkit-transform": "translateY(-10px);",
            transform: "translateY(-10px);",
          },
        },
        "scale-in-center": {
          "0%": {
            "-webkit-transform": "scale(0)",
            transform: "scale(0)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0;",
          },
          "100%": {
            opacity: "1;",
          },
        },
        "slide-in-top": {
          "0%": {
            "-webkit-transform": "translateY(-100px);",
            transform: "translateY(-100px);",
            opacity: "0;",
          },
          "100%": {
            "-webkit-transform": "translateY(0);",
            transform: "translateY(0);",
            opacity: "1;",
          },
        },
        "slide-in-bottom": {
          "0%": {
            "-webkit-transform": "translateY(100px);",
            transform: "translateY(100px);",
            opacity: "0;",
          },
          "100%": {
            "-webkit-transform": "translateY(0);",
            transform: "translateY(0);",
            opacity: "1;",
          },
        },
        "slide-out-bottom": {
          "0%": {
            "-webkit-transform": "translateY(100px);",
            transform: "translateY(100px);",
            opacity: "0;",
          },
          "100%": {
            "-webkit-transform": "translateY(0);",
            transform: "translateY(0);",
            opacity: "1;",
          },
        },
      },
      animation: {
        "slide-top":
          "slide-top 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "scale-in-center":
          "scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "fade-in":
          "fade-in 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;",
        "slide-in-top":
          "slide-in-top 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-in-bottom":
          "slide-in-bottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-out-bottom":
          "slide-out-bottom 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;",
      },
    },
  },
  plugins: [require("daisyui")],
};
