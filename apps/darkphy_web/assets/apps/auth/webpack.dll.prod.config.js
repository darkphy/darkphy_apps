// @flow weak
const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

const excludedDeps = ['lodash'];
const deps = []
  .concat(Object.keys(packageJson.dependencies))
  .filter(dep => {
    return excludedDeps.indexOf(dep) === -1;
  });
module.exports = {
  entry: {
    lib: deps,
  },
  output: {
    filename: 'dll.bundle.js',
    path: path.join(__dirname, 'build'),
    library: 'dll',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'dll',
      path: './build/dll.manifest.json',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ]
};
