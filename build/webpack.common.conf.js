const path = require('path')
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const cssnano = require('cssnano')

const config = require('./config')
const getLoaders = require('./loader')
const getPlugins = require('./plugin')

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}
function subDir (dir) {
  return path.posix.join(config[process.env.BUILD_ENV].SUB_DIR, dir)
}
const isProd = process.env.NODE_ENV === 'production'

const baseConfig = {
  target: 'web',
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? '' : 'cheap-module-eval-source-map',
  entry: {
    main: resolve('src/main.js')
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    publicPath: config[process.env.BUILD_ENV].PUBLIC_PATH
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '@components': resolve('src/components'),
      '@assets': resolve('src/assets'),
      '@components': resolve('src/components'),
      '@routes': resolve('src/routes'),
      '@store': resolve('src/store')
    }
  },
  module: {
    rules: getLoaders(process.env.NODE_ENV, '<%=css%>')
  },
  plugins: getPlugins(process.env.NODE_ENV)
}

module.exports = () => {
  let exConfig = {}
  if (process.env.NODE_ENV === 'local') {
    exConfig.devServer = config.devServer
  } else {
    exConfig = {
      output: {
        filename: subDir('js/[name].[contenthash:8].js'),
        chunkFilename: subDir('js/[name].[contenthash:8].js')
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            common: {
              name: 'common',
              chunks: 'async',
              test: /[\\/]src[\\/]/,
              minChunks: 2,
              minSize: 0,
              priority: -10,
              reuseExistingChunk: true
            }
            // vendor: {
            //   name: 'vendor',
            //   test: /[\\/]node_modules[\\/]/,
            //   chunks: 'all',
            //   priority: 10
            // },
            // ui: {
            //   name: 'ui', // 单独将 elementUI 拆包
            //   test: /[\\/]node_modules[\\/]_element-ui@[\d\.]+/,
            //   chunks: 'all',
            //   priority: 20
            // }
          }
        },
        runtimeChunk: {
          name: 'manifest'
        },
        minimizer: [
          new ParallelUglifyPlugin({
            include: [/[\\/]src[\\/]/],
            uglifyJS: {
              output: {
                comments: false,
                beautify: false
              },
              compress: {
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true
              }
            }
          }),
          new OptimizeCssAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: {
              discardComments: { removeAll: true }
            },
            canPrint: true
          })
        ]
      }
    }
  }
  return merge(baseConfig, exConfig)
}
