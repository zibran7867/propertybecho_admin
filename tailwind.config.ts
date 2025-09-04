import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: [heroui({
        themes: {
            light: {
                extend: "light", // <- inherit default values from dark theme
                colors: {
                    background: {
                        // DEFAULT: "#FFF8E7",
                        DEFAULT: "#f2f8fc",
                    },
                    default: {
                        50: "#f6f6f6",
                    },
                    primary: {
                        DEFAULT: "#0c68ff",
                        50: "#cce0ff",
                        100: "#80b3ff",
                        200: "#1a75ff",
                        300: "#005ce6",
                        foreground: "#fff"
                    },
                    secondary: {
                        DEFAULT: "#0c68ff",
                        50: "#0c68ff",
                    },
                    danger: {
                        DEFAULT: '#fc0303',
                        50: '#ffd4d4'
                    },
                    focus: "#F182F6",
                },
            },
        },
    },)]
};