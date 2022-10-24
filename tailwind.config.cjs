/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	important: true,
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				'ultra-mobile': '300px',
				tablet: '624px'
      },

      colors: {
        'raisin-black': '#242124',
        white: '#ffffff'
      }
		}
	},
	plugins: []
};
