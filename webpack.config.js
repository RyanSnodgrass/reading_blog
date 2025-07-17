const path = require('path');

module.exports = {
  entry: './source/javascripts/index.js',
  output: {
    filename: 'site.js',
    path: path.resolve(__dirname, 'dist/javascripts'),
  },
  externals: {
    'sharp': 'commonjs sharp'
  }
};
