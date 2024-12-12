/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 'source/javascripts/*.js',
    // 'source/stylesheets/**/*.{css,scss}',
    './source/**/*.{html,erb}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['lato', 'ui-sans-serif', 'system-ui'],
        'serif': ['playfair display'],
        'navbar': ['lato']
      },
    },
  },
  plugins: [],
  safelist: [
    // artricle cover image
    'w-36',
  ]
}
