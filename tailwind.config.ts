import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#cb0c9f",
        success: "#82d616",
        info: "#17c1e8",
        warning: "#fbcf33",
        danger: "#ea0606",
        dark: "#344767",
        body: "#67748e",
        muted: "#8392ab",
        page: "#f8f9fa",
        light: "#e9ecef",
        input: "#d2d6da",
        "dark-page": "#1a1f36",
        "dark-card": "#202940",
      },
      borderColor: {
        input: "#d2d6da",
        light: "#e9ecef",
      },
      backgroundColor: {
        page: "#f8f9fa",
        light: "#e9ecef",
      },
      boxShadow: {
        soft: "0 20px 27px 0 rgba(0,0,0,0.05)",
        "soft-hover": "0 20px 27px 0 rgba(0,0,0,0.08)",
        "soft-dark": "0 20px 27px 0 rgba(0,0,0,0.25)",
        dropdown: "0 8px 26px 0 rgba(0,0,0,0.12)",
        navbar: "0 2px 12px 0 rgba(0,0,0,0.04)",
        blur: "0 4px 6px 0 rgba(0,0,0,0.12)",
        primary:
          "0 3px 5px -1px rgba(203,12,159,0.25), 0 5px 12px -3px rgba(203,12,159,0.20)",
        info: "0 3px 5px -1px rgba(23,193,232,0.25), 0 5px 12px -3px rgba(23,193,232,0.20)",
        success:
          "0 3px 5px -1px rgba(130,214,22,0.25), 0 5px 12px -3px rgba(130,214,22,0.20)",
        warning:
          "0 3px 5px -1px rgba(251,207,51,0.25), 0 5px 12px -3px rgba(251,207,51,0.20)",
        danger:
          "0 3px 5px -1px rgba(234,6,6,0.25), 0 5px 12px -3px rgba(234,6,6,0.20)",
        dark: "0 3px 5px -1px rgba(52,71,103,0.25), 0 5px 12px -3px rgba(52,71,103,0.20)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(310deg, #7928CA, #FF0080)",
        "gradient-info": "linear-gradient(310deg, #2152FF, #21D4FD)",
        "gradient-success": "linear-gradient(310deg, #17AD37, #98EC2D)",
        "gradient-warning": "linear-gradient(310deg, #F53939, #FBCF33)",
        "gradient-danger": "linear-gradient(310deg, #EA0606, #FF667C)",
        "gradient-dark": "linear-gradient(310deg, #141727, #3A416F)",
        "gradient-secondary": "linear-gradient(310deg, #627594, #A8B8D8)",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
