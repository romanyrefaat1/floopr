/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", "class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          muted: "hsl(var(--primary-muted))",
          mutedForeground: "hsl(var(--primary-muted-foreground))",
        },
        background: "hsl(var(--background))",
        secondaryBackground: "hsl(var(--secondary-background))",
        foreground: "hsl(var(--foreground))",
        secondaryForeground: "hsl(var(--secondary-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: "hsl(var(--muted))",
        mutedForeground: "hsl(var(--muted-foreground))",
        mutedBackground: "hsl(var(--muted-background))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        marketing: {
          "floopr-purple": "hsl(250, 89%, 68%)",
          "floopr-purple-dark": "hsl(250, 89%, 48%)",
          "floopr-purple-light": "hsl(250, 89%, 88%)",
          background: "hsl(0, 0%, 100%)", // Changed to HSL format
          accent: {
            DEFAULT: "hsl(250, 89%, 68%)",
            foreground: "hsl(0, 0%, 100%)",
            light: "hsl(250, 89%, 88%)",
            dark: "hsl(250, 89%, 48%)",
          },
          glass: {
            background: "hsl(0 0% 100% / 0.9)",
            border: "hsl(0 0% 100% / 0.125)",
          },
        },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
        modal: "1rem",
      },
      gap: {
        xl2: "10px",
        xl: "8px",
        lg: "6px",
        md: "4px",
        sm: "2px",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "spinner-leaf-fade": {
          "0%, 100%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spinner-leaf-fade": "spinner-leaf-fade 800ms linear infinite",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwindcss-animate"),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwind-scrollbar"),
  ],
};
