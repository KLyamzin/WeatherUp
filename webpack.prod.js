const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        title: "WeatherUp",
        filename: "index.html",
        template: "src/template.html",
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
});
