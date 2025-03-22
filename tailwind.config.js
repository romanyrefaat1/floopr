/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
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
				// Main primary color with additional muted variants.
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
					muted: "hsl(var(--primary-muted))",
					mutedForeground: "hsl(var(--primary-muted-foreground))",
				},
				// Base colors.
				background: "hsl(var(--background))",
				secondaryBackground: "hsl(var(--secondary-background))",
				foreground: "hsl(var(--foreground))",
				secondaryForeground: "hsl(var(--secondary-foreground))",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				// Additional muted values for text and other elements.
				muted: "hsl(var(--muted))",
				mutedForeground: "hsl(var(--muted-foreground))",
			},
			// Increase borderRadius values for a more rounded UI
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
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
