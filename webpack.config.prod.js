const baseConfig = require('./webpack.config');
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const config = require("./webpack.config");

module.exports = Object.assign(baseConfig, {
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name]-[hash].js",
    publicPath: 'https://viewly-playlists-website.s3-website.eu-central-1.amazonaws.com/'
  },
  plugins: [
    ...config.plugins
  ]
})
