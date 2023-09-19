/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			sm: '720px',
			xl: '1473px',
		},
		extend: {
			fontFamily: {
				geo: ['Geo', 'sans-serif'],
			},
			backgroundImage: {
				cardbg: "url('../assets/bg.png')",
			},
			colors: {
				fg: '#18162f',
				bg: '#fcfff5',
			},
		},
	},
	plugins: [],
}
