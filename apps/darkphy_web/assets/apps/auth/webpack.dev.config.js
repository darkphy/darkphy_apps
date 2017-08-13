// @flow weak
/* eslint-disable import/no-unresolved */
const webpack = require('webpack');
const webpackBaseConfig = require('./webpackBaseConfig');
const dllManifest = require('./build/dll.manifest.json');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PORT = process.env.MATERIAL_UI_PORT || 3000;

module.exports = Object.assign({}, webpackBaseConfig, {
  cache: true,
  devtool: 'inline-source-map',
  entry: {
    main: [
      //'eventsource-polyfill', // hot reloading in IE
      'babel-polyfill',
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://0.0.0.0:${PORT}`,
      'webpack/hot/only-dev-server',
      './src/index',
    ],
  },
  plugins: webpackBaseConfig.plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: dllManifest,
    }),
    /*
    new BundleAnalyzerPlugin({
        analyzerMode: 'static'
    }),
    */
  ]),
});
