/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	prefix: 'tw-',
	important: true,
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				'ultra-mobile': '300px',
				tablet: '672px'
			}
		},

		colors: {
			'raisin-black': 'rgb(36 33 36)',
			white: 'rgb(255 255 255)',
			'electric-blue': 'rgb(44 117 255)'
		},

		transitionDuration: {
			250: '250ms',
			500: '500ms'
		}
	}
};
