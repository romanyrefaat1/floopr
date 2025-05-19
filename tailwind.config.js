const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        mutedForeground: "hsl(var(--muted-foreground))",
        mutedBackground: "hsl(var(--muted-background))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          muted: "hsl(var(--primary-muted))",
          "muted-foreground": "hsl(var(--primary-muted-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          background: "hsl(var(--muted-background))",
          destructive: "hsl(var(--muted-destructive))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Floopr and sidebar colors remain for landing/marketing/side UI
        floopr: {
          purple: "#7C65F6",
          "purple-light": "#9B87F5",
          "purple-dark": "#5E49D2",
          "purple-bg": "#F6F4FF",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        float: "float 20s ease-in-out infinite",
        "float-slow": "float 25s ease-in-out infinite",
        "float-slower": "float 30s ease-in-out infinite",
        "spinner-leaf-fade": "spinner-leaf-fade 800ms linear infinite",
        "spinner-leaf-fade-slow": "spinner-leaf-fade 1.2s linear infinite",
      },
      keyframes: {
        float: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "20%": { transform: "translate(25px, -25px) rotate(5deg)" },
          "40%": { transform: "translate(-15px, 25px) rotate(-5deg)" },
          "60%": { transform: "translate(-25px, -15px) rotate(3deg)" },
          "80%": { transform: "translate(15px, 25px) rotate(-3deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
        "spinner-leaf-fade": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
