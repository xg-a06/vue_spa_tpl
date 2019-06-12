const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const config = require('./config')
const { resolve, subDir } = require('./utils')

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
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: resolve('src')
      },
      {
        test: /\.js[x]?$/,
        loader: 'happypack/loader?id=happy-babel',
        include: resolve('src')
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: subDir('images'),
            limit: 8192 // 8k以下base64
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: subDir('media')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: subDir('fonts')
        }
      }
    ]
  },
  plugins: [
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
    })
  ]
}

module.exports = baseConfig
