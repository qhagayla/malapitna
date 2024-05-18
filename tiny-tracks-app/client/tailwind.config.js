/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#FFC800",
                secondary: "#F9DB9B",
                accent: "#EC6E58",
                white: "#F5F5F5",
                black: "#333333",
                blue: {
                    100: "#EBF8FF",
                    200: "#BEE3F8",
                    300: "#90CDF4",
                    400: "#63B3ED",
                    500: "#4299E1",
                    600: "#3182CE",
                    700: "#2B6CB0",
                    800: "#2C5282",
                    900: "#2A4365",
                },
                "light-tint": "#FFF0C7",
                "dark-tint": "#F4C27A",
            },
        },
    },
    plugins: [
        plugin(({ addBase, theme }) => {
            addBase({
                html: { color: theme("colors.black") },
            });
        }),
    ],
};
