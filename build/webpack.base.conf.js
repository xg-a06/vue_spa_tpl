const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const threadLoader = require('thread-loader');
const config = require('./config');
const { resolve, subDir } = require('./utils');

threadLoader.warmup(
  {
    workers: 4,
  },
  ['babel-loader', '@babel/preset-env', 'less-loader']
);

const isProd = process.env.NODE_ENV === 'production'

const baseConfig = {
  target: 'web',
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'inline-source-map',
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
    }
  },
  module: {
    rules: [
      {
        test: /\.vue?$/,
        include: resolve('src'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 4,
            },
          },
          'cache-loader',
          'vue-loader',
        ],
      },
      {
        test: /\.js[x]?$/,
        include: resolve('src'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 4,
            },
          },
          'cache-loader',
          'babel-loader?cacheDirectory=true',
        ],
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
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      'process.env': {
        BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
        API_PATH: JSON.stringify(config[process.env.BUILD_ENV].API_PATH),
        SUB_DIR: JSON.stringify(config[process.env.BUILD_ENV].SUB_DIR),
        PUBLIC_PATH: JSON.stringify(config[process.env.BUILD_ENV].PUBLIC_PATH)
      }
    })
  ]
}

module.exports = baseConfig
