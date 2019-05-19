const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const path = require('path')
const chalk = require('chalk')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: resolve('.'),
  mode: 'production',
  entry: {
    vendor: ['vue', 'vue-router', 'vuex', 'axios'],
    ui: ['element-ui', 'element-ui/lib/theme-chalk/index.css']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'fonts'
        }
      }
    ]
  },
  output: {
    filename: 'js/[name].[contenthash:8].dll.js',
    path: resolve('src/assets/dll'),
    library: '[name]',
    libraryTarget: 'window'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new webpack.DllPlugin({
      name: '[name]',
      path: resolve('build/[name].dll.manifest.json')
    }),
    new ProgressBarPlugin({
      format:
        '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    })
  ]
}
