/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",],
	theme: {
		extend: {
			colors: {
				'green_1': '#1A1A19',
				'green_2': '#31511E',
				'green_3': '#859F3D',
				'green_4': '#F6FCDF',
			}
		},
	},
	plugins: [],
}

