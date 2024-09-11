const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "fs": false // Disable fs polyfill if not needed
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser', // Add this line if you encounter process issues
    })
  ]
};
