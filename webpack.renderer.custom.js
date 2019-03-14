const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === 'production';

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    config: {
      path: path.resolve(__dirname, './postcss.config.js'),
    },
  },
};
const miniLoaders = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  postcssLoader
]
const cssHotLoader = isProduction ? miniLoaders : ["css-hot-loader"].concat(miniLoaders);

module.exports = {
  module: {
    rules: [
    {
      test: /\.less$/,
      use: cssHotLoader.concat("less-loader"),
    },
    {
      test: /\.vue$/,
      loader: "vue-loader",
    },
  ],
  },
  plugins: [
    new MonacoWebpackPlugin(),
  ]
}