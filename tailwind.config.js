/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                body: ["Poppins", "sans-serif"]
            }
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "15px",
                md: "25px",
                lg: "20px"
            }
        },

        screens: {
            sm: "640px",
            md: "768px",
            lg: "960px",
            xl: "1200px"
        }
    },
    plugins: []
};
