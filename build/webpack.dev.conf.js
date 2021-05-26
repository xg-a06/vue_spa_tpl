const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin');
const friendlyFormatter = require('eslint-friendly-formatter');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge');
const config = require('./config')
const { resolve } = require('./utils')
const baseConfig = require('./webpack.base.conf')
const { getCssLoaders } = require('./utils')

const devConfig = merge(baseConfig, {
  devServer: config.devServer,
  module: {
    rules: getCssLoaders()
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    <% if(esLint){ -%>new ESLintPlugin(),<%} -%>
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('src/static'),
          to: resolve(`dist/${config[process.env.BUILD_ENV].SUB_DIR}`),
        },
      ],
    })
  ]
})

module.exports = devConfig
