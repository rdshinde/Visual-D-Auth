// import { tailwind } from 'tailwindcss';
// import autoprefixer from 'autoprefixer';
// import tailwindConfig from './tailwind.config';

const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const tailwindConfig = require('./tailwind.config');

module.exports = {
  plugins: [tailwind(tailwindConfig), autoprefixer],
};

// export default {
//   plugins: [tailwind(tailwindConfig), autoprefixer],
// };
