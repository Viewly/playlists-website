const path = require("path");
const config = require("./webpack.config");

const isProduction = process.env.NODE_ENV === "production";

module.exports = Object.assign(config, {
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name]-[hash].js",
    publicPath: isProduction ? "https://assets.vidflow.io/" : "/"
  },
  plugins: [
    ...config.plugins
  ]
});
