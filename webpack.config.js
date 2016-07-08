var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    "vendor": "./test/vendor",
    "app": "./test/boot"
  },
  output: {
    path: __dirname+ "/dist",
    filename: "./[name].bundle.js"
  },
  resolve: {
    extensions: ['', '.ts', '.js','.html']
  },
  devtool: 'source-map',
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
        exclude: ['./index.html']
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"app", /* filename= */"./dist/app.bundle.js"),
    new HtmlWebpackPlugin({template: './index.html',chunksSortMode: 'none'})
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
}
