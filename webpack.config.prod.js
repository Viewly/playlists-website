const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.config");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebappWebpackPlugin = require('webapp-webpack-plugin')
const isProduction = process.env.NODE_ENV === "production";

module.exports = Object.assign(config, {
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name]-[hash].js",
    publicPath: isProduction ? "https://assets.vidflow.com/" : "/"
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: isProduction ? "./src/index-production.html" : "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "style-[hash].css",
      chunkFilename: "[id].css"
    }),
    new WebappWebpackPlugin("./src/favicons/favicon.png"),
    new webpack.DefinePlugin({
      DEVELOPMENT: true,
      PRODUCTION: isProduction,
      CLIENT: true,
      SERVER: false
    })
  ]
});
