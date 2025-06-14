// https://github.com/michael-ciniawsky/postcss-load-config

import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
// import rtlcss from 'postcss-rtlcss'

export default {
  plugins: [
    // https://github.com/postcss/autoprefixer
    tailwindcss(),
    autoprefixer(),

    // https://github.com/elchininet/postcss-rtlcss
    // If you want to support RTL css, then
    // 1. yarn/pnpm/bun/npm install postcss-rtlcss
    // 2. optionally set quasar.config.js > framework > lang to an RTL language
    // 3. uncomment the following line (and its import statement above):
    // rtlcss()
  ]
}