const baseConfig = require('./webpack.config');
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = Object.assign(baseConfig, {
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name]-[hash].js",
    publicPath: '/'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "style-[hash].css",
      chunkFilename: "[id].css"
    })
  ]
})
