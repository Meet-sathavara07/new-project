/* eslint-disable global-require */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const postcssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'main.js',
    publicPath: '/',
  },
  mode: devMode ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssImport(), tailwindcss('./tailwind.config.js')],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  devServer: {
    open: true,
    port: 8080,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.tailwindcss'],
  },
};
