const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',

  entry: {
    index: './src/index.js',
  },

  devServer: {
    static: './dist',
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'To Do, or Not To Do',
      template: './templates/index-template.html',
    }),

    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),

    clean: true,
  },
};
