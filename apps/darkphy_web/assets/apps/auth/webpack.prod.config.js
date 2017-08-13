// @flow weak
/* eslint-disable import/no-unresolved */

const webpack = require('webpack');
const webpackBaseConfig = require('./webpackBaseConfig');
//const dllManifest = require('./build/dll.manifest.json');
const CompressionPlugin = require('compression-webpack-plugin');

const vendor = [
  'react',
  'react-dom',
  'react-relay',
  'react-router',
  'react-router-dom',
  'mobx',
  'mobx-react',
  'material-ui',
  'material-son'
];
module.exports = Object.assign({}, webpackBaseConfig, {
  entry: {
    main: ['./src/index'],
    vendor
  },
  plugins: webpackBaseConfig.plugins.concat([
/*
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: dllManifest,
    }),
*/
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
        unused: true,
        dead_code: true,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
  }),
    /*Common chunk plugins*/
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 50000}),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),

  ]),
});
