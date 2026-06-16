/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        /* FinGuard Brand Colors */

        primary: "#16A34A", // Green - Trust / Secure

        danger: "#DC2626", // Red - Fraud / Alerts

        darkbg: "#0F172A", // Slate dark mode background

        lightbg: "#F8FAFC", // Light mode background

        cardlight: "#FFFFFF",

        carddark: "#1E293B",

        muted: "#64748B",
      },

      boxShadow: {
        greenGlow: "0 0 25px rgba(22,163,74,0.35)",

        redGlow: "0 0 25px rgba(220,38,38,0.35)",

        mixedGlow:
          "0 0 20px rgba(22,163,74,0.25), 0 0 20px rgba(220,38,38,0.25)",
      },

      animation: {
        pulseShield: "pulseShield 2.5s ease-in-out infinite",

        glowGreen: "glowGreen 3s ease-in-out infinite",

        glowRed: "glowRed 3s ease-in-out infinite",

        float: "float 4s ease-in-out infinite",

        fadeIn: "fadeIn 0.8s ease forwards",
      },

      keyframes: {
        pulseShield: {
          "0%,100%": {
            transform: "scale(1)",
            opacity: "1",
          },

          "50%": {
            transform: "scale(1.08)",
            opacity: "0.85",
          },
        },

        glowGreen: {
          "0%,100%": {
            textShadow:
              "0 0 8px rgba(22,163,74,0.35)",
          },

          "50%": {
            textShadow:
              "0 0 25px rgba(22,163,74,0.7)",
          },
        },

        glowRed: {
          "0%,100%": {
            textShadow:
              "0 0 8px rgba(220,38,38,0.35)",
          },

          "50%": {
            textShadow:
              "0 0 25px rgba(220,38,38,0.7)",
          },
        },

        float: {
          "0%,100%": {
            transform: "translateY(0px)",
          },

          "50%": {
            transform: "translateY(-10px)",
          },
        },

        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(15px)",
          },

          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },

  plugins: [],
};