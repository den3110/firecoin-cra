/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,
  theme: {
      extend: {
        screens: {
        sm: '1024px', // Thay đổi min-width cho breakpoint 'sm'
      },
          fontFamily: {
              sans: ["var(--font-sarabun)", "sans-serif"],
              chart: ["Lucida Grande", "sans-serif"],
              arial: ["Arial", "sans-serif"],
              frizon: ["var(--font-frizon)"],
              lato: ["var(--font-lato)"],
          },
          fontSize: {
              '20': '20px',
            },
          backgroundImage: {
              "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
              "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
              "gradient-primary": "linear-gradient(var(--primary-start), var(--primary-end))",
              // "gradient-primary": "linear-gradient(#ff592c,#ff592c)",
              "gradient-home-section-2": `url(../../../assets/images/home-01/section-2-bg.png), linear-gradient(var(--primary-start), var(--primary-end))`,
          },
          colors: {
              primary: {
                  DEFAULT: "var(--primary)",
              },
              secondaryLanding: {
                  DEFAULT: "var(--secondary-landing)",
              },secondarySidebar: {
                  DEFAULT: "var(--secondary-sidebar)",
              },
              secondary: {
                  50: "#fff",
                  100: "#e6e9ef",
                  200: "#bfc7d7",
                  300: "#99a5bf",
                  400: "#2f3342",
                  500: "#011022",
                  600: "#02142b",
                  700: "#010c19",
                  800: "#010913",
                  900: "#01060c",
                  DEFAULT: "var(--secondary)",//011022
              },
              danger: {
                  DEFAULT: "#fa4b62",
              },
              success: {
                  50: "#04c793",
                  DEFAULT: "#23C15F",
              },
              warning: {
                  DEFAULT: "#f0b90b",
              },
              text: {
                  "link-active": "#ff592c",
                  paste: "#2177ff",
                  DEFAULT: "#8b8d96",
              },
              light: {
                  50: "#8b8d96",
                  100: "#4d505d",
                  DEFAULT: "#fff",
              },
              custom: {
                  balance: "#2f3342",
                  "chart-title": "#1d233b",
                  "toggle-button": "#24252f",
                  border: "#303539",
                  win: "#2d55fd",
                  draw: "#7b738e",
                  lose: "#ff2a55",
                  divider: "#41416f",
                  dropdown: "#212529",
                  "vip-bg": "#82f92a",
                  vip: "#f9d921",
              },
              "upgrade-vip": {
                  "box-bg": "#242424",
                  "header-border": "#ffe1b0",
                  "content-bg": "#161616",
                  icon: "#facc00",
                  tooltip: "#060642",
              },
              up: {
                  DEFAULT: "#04C793",
              },
              down: {
                  DEFAULT: "#FA4B62",
              },
          },
          backgroundColor: {
              'custom-style': '#141416',
            },
            maxWidth: {
              'custom-container': '1140px',
            },
      },
  },
  plugins: [
      require("@tailwindcss/forms")({
          useFormClasses: true,
      }),
  ],
};
