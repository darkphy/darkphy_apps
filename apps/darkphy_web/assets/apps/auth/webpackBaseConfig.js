// @flow weak
const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const sharedModule = (process.env.NODE_ENV === 'development') ? path.resolve(__dirname, '../shared/') : path.resolve(__dirname, 'src/shared/');

module.exports = {
  context: path.resolve(__dirname),
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        APP_VERSION: JSON.stringify(pkg.version),
      },
    }),
    new ExtractTextPlugin({
      filename : 'darkstyles.css',
      allChunks : true
    }),
    new webpack.NamedModulesPlugin(),
    new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true,
    }),
  ],
  resolve: {
    alias: {
      //'material-son': path.resolve('../../../../../../../material-son/src'),
      'utube': path.resolve(__dirname, '../../../../../../../utube/src'),
      'shared': sharedModule,
      'npmmod': path.resolve(__dirname,'node_modules'),
      //'material-ui-icons': path.resolve(__dirname, '../packages/material-ui-icons/src'),
    },
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-chunk.js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        //include: [sharedModule, path.join(__dirname, 'src')],
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: process.env.NODE_ENV === 'development' ? false : true,
                modules: true,
                localIdentName: '[name]-[local]-[hash:base64:5]',
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
    ],
  },
};
