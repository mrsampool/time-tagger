const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (env) => {
  return {

    mode: "development",
    plugins: [
      new webpack.DefinePlugin({
        'process.env.ENV': JSON.stringify(env.ENV)
      }),
      new MiniCssExtractPlugin({ filename: 'bundle.css' }),
      new CompressionPlugin(),
    ],
    entry: path.resolve(__dirname, 'client', 'src'),
    output: {
      path: path.resolve(__dirname, 'client', 'build'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          include: path.resolve(__dirname, 'client', 'src'),
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          ]
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'client', 'src'),
          exclude: /node_modules/,
          use: [
            {loader: MiniCssExtractPlugin.loader},
            {loader: 'css-loader'}
          ]
        }
      ]
    }

  }
}
