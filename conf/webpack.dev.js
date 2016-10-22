var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = webpackMerge({
  devtool: 'source-map',
  entry: {
    'polyfills': './test/polyfills.ts',
    'vendor': './test/vendor.ts',
    'app': './test/boot.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.js','.html','.css']
  },

  output: {
    path: 'dist',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.ts/,
        loaders: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: ['../index.html']
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: ['app','vendor', 'polyfills']}),
    new HtmlWebpackPlugin({template: 'index.html'})
  ],

  devServer: {
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
});
