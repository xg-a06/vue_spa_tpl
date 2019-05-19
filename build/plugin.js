const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const config = require('./config')

const chalk = require('chalk')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const pushArr = Array.prototype.push

function resolve (dir) {
  return path.posix.resolve(__dirname, '..', dir)
}

function subDir (dir) {
  return path.posix.join(config[process.env.BUILD_ENV].SUB_DIR, dir)
}

const autoAddDllRes = () => {
  return new AddAssetHtmlPlugin([
    {
      publicPath: config[process.env.BUILD_ENV].PUBLIC_PATH + 'static/dll/css', // 注入到html中的路径
      outputPath: subDir('dll/css'), // 最终输出的目录
      filepath: resolve('src/assets/dll/**/*.css'),
      includeSourcemap: false,
      typeOfAsset: 'css'
    },
    {
      publicPath: config[process.env.BUILD_ENV].PUBLIC_PATH + 'static/dll/js', // 注入到html中的路径
      outputPath: subDir('dll/js'), // 最终输出的目录
      filepath: resolve('src/assets/dll/**/*.js'),
      includeSourcemap: false,
      typeOfAsset: 'js'
    }
  ])
}

function getCommonPlugins () {
  return [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: 'index.html',
      minify: true
    }),
    new HappyPack({
      id: 'happy-babel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: true // 启用缓存
          }
        }
      ],
      threadPool: HappyPack.ThreadPool({ size: os.cpus().length })
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_PATH: JSON.stringify(config[process.env.BUILD_ENV].API_PATH),
        SUB_DIR: JSON.stringify(config[process.env.BUILD_ENV].SUB_DIR),
        PUBLIC_PATH: JSON.stringify(config[process.env.BUILD_ENV].PUBLIC_PATH)
      }
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('src/static'),
        to: resolve(`dist/${config[process.env.BUILD_ENV].SUB_DIR}`),
        ignore: ['.*']
      },
      {
        from: resolve('src/assets/dll/fonts'),
        to: resolve(
          `dist/${config[process.env.BUILD_ENV].SUB_DIR}/dll/css/fonts/`
        ),
        ignore: ['.*']
      }
    ])
  ]
}

function getBuildPlugins (env) {
  const plugins = [
    new CleanWebpackPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require('./ui.dll.manifest.json')
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./vendor.dll.manifest.json')
    }),
    ...[autoAddDllRes()],
    new MiniCssExtractPlugin({
      filename: subDir('css/[name].[contenthash:8].css'),
      chunkFilename: subDir('css/[name].[contenthash:8].css')
    }),
    new ProgressBarPlugin({
      format:
        '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    })
  ]
  if (config.buildDetail) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 8899
      })
    )
  }
  return plugins
}

module.exports = function (env) {
  const commonPlugins = getCommonPlugins()
  const plugins = []
  if (env === 'local') {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }
  pushArr.apply(plugins, commonPlugins)
  if (env !== 'local') {
    const buildPlugins = getBuildPlugins(env)
    pushArr.apply(plugins, buildPlugins)
  }
  return plugins
}
