/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",],
	theme: {
		extend: {
			colors: {
				'primary_1': '#F5F5F5',
				'primary_2': '#48CFCB',
				'primary_3': '#229799',
				'primary_4': '#424242',
			}
		},
	},
	plugins: [],
}

