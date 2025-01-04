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
				accent: {
					'primary_4_light': '#646464',
				}
			},
			keyframes: {
				progress: {
					from: {width: "0%"},
					to: {width: "100%"},
				},
			},
			animation: {
				progress: "progress 3s linear forwards",
			},
			screens: {
				'sMobile': '320px',
				'mMobile': '375px',
				'lMobile': '425px',
				'tablet': '768px',
				'laptop': '1024px',
				'lLaptop': '1440px',
				'monitor': '1920px',
				'4K': '2560px',
			}
		},
	},
	plugins: [],
}

