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
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: false,
      PRODUCTION: true,
      CLIENT: false,
      SERVER: true,
      'process.env': {
        NODE_ENV: `'production'`
      }
    })
  ],
};
