import type { Config } from 'tailwindcss'



const config: Config = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors:{
        'MainColor': '#00386F',
        'SecondColor': '#FF2120'
      }
    },
  },

  plugins: [require('daisyui'),
    require('@tailwindcss/forms'), require('flowbite/plugin')],
  darkMode: ['class', '[data-mode="dark"]'],

}


export default config
