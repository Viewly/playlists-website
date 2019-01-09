const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js", "./src/styles/global.scss"],
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name]-[hash:8].[ext]"
            },
          },
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          "style-loader?sourceMap",
          "css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "css-loader?-url",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  devServer: {
    port: 3000,
    contentBase: "/",
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      favicon: './src/favicons/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: "style-[hash].css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      DEVELOPMENT: true,
      PRODUCTION: false,
      CLIENT: true,
      SERVER: false
    })
  ]
};
