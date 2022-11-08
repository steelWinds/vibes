/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	prefix: 'tw-',
	important: true,
	content: ['./src/**/*.{html,js,svelte,ts,css}'],
	theme: {
		extend: {
			screens: {
				'ultra-mobile': '300px',
				mobile: '464px',
				tablet: '672px'
			}
		},

		colors: {
			'raisin-black': 'rgb(36 33 36)',
			'raisin-black-pre-crystal': 'rgb(36 33 36 / .9)',
			'raisin-black-crystal': 'rgb(36 33 36 / .3)',
			'raisin-gray': 'rgb(146 144 146)',
			white: 'rgb(255 255 255)',
			'white-crystal': 'rgb(255 255 255 / .9)',
			'electric-blue': 'rgb(44 117 255)',
			'electric-blue-crystal': 'rgb(44 117 255 / .3)',
			'red-pre-crystal': 'rgb(207 0 15 / .9)',
			'green-pre-crystal': 'rgb(22 160 133 / .9)'
		},

		transitionDuration: {
			50: '50ms',
			150: '150ms',
			250: '250ms',
			500: '500ms'
		}
	}
};
