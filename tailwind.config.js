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
        'sans': ['Karla', 'ui-sans-serif', 'system-ui'],
        'serif': ['playfair display'],
        'navbar': ['lato']
      },
      colors: {
        // https://coolors.co/palette/003049-d62828-f77f00-fcbf49-eae2b7
        'prussian-blue': '#003049',
        // 'fire-engine': '#D62828',
        // 'orange-wheel': '#F77F00',
        'xanthous': '#FCBF49',
        // 'vanilla': '#EAE2B7',
        'bittersweet': '#F87666',
        'celadon': '#B3EFB2',
        'alice-blue': '#E8F1F2',
      },
    },
  },
  plugins: [],
  safelist: [
    // artricle cover image
    'w-36',
  ]
}
