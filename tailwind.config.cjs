/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  important: true,
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
    extend: {
      screens: {
        'ultra-mobile': '300px',
        'tablet': '624px'
      },
    }
	},
	plugins: []
};
