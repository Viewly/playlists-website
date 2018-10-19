const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const config = require("./webpack.config");

module.exports = {
  entry: ["@babel/polyfill", "./src/server.js"],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  module: config.module,
  target: 'node',
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'production'`
      }
    })
  ],
};
