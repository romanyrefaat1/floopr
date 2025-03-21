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
					DEFAULT: "#7c64f6",
					foreground: "#ffffff",
					muted: "#b4a7d6", // a softer version of primary
					mutedForeground: "#e0d8f8",
				},
				// Base colors.
				background: "#ffffff",
				foreground: "#000000",
				border: "#e5e7eb",
				input: "#f3f4f6",
				ring: "#7c64f6",
				// Additional muted values for text and other elements.
				muted: "#f5f5f5",
				mutedForeground: "#6b7280", // Tailwind gray-500 equivalent
			},
			// Increase borderRadius values for a more rounded UI
			borderRadius: {
				lg: "1rem", // increased from 0.5rem
				md: "0.75rem",
				sm: "0.5rem",
				// Modal
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
