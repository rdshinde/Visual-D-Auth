import('tailwindcss').tailwind;
import('autoprefixer').autoprefixer;
import('./tailwind.config').tailwindConfig;

module.exports = {
  plugins: [tailwind(tailwindConfig), autoprefixer],
};
