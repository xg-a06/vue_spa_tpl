const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./config')

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

function subDir (dir) {
  return path.posix.join(config[process.env.BUILD_ENV].SUB_DIR, dir)
}
<% if(esLint){ -%>
const lintLoader = {
  test: /\.(vue|js|jsx)$/,
  use: {
    loader: 'eslint-loader',
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  },
  include: [resolve('src')],
  enforce: 'pre'
}
<%} -%>
function getCommonLoaders () {
  return [
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
}

function getCssLoaders (env, cssPreprocessor) {
  let isLocal = env === 'local'
  let isProd = env === 'production'
  let sourceMap = !isProd
  let lastLoader = isLocal ? 'vue-style-loader' : MiniCssExtractPlugin.loader

  const cssInclude = [resolve('src')]
  if (isLocal) {
    cssInclude.push(resolve('node_modules/element-ui'))
  }
  const loaders = [
    {
      test: /\.css$/,
      use: [
        { loader: lastLoader, options: { sourceMap: sourceMap } },
        {
          loader: 'css-loader',
          options: { sourceMap: sourceMap, importLoaders: 1 }
        },
        { loader: 'postcss-loader', options: { sourceMap: sourceMap } }
      ],
      include: cssInclude
    }
  ]
  if (cssPreprocessor === 'sass') {
    loaders.push({
      test: /\.scss$/,
      use: [
        { loader: lastLoader, options: { sourceMap: sourceMap } },
        {
          loader: 'css-loader',
          options: { sourceMap: sourceMap, importLoaders: 2 }
        },
        { loader: 'postcss-loader', options: { sourceMap: sourceMap } },
        { loader: 'sass-loader', options: { sourceMap: sourceMap } }
      ],
      include: resolve('src')
    })
  } else if (cssPreprocessor === 'less') {
    loaders.push({
      test: /\.less$/,
      use: [
        { loader: lastLoader, options: { sourceMap: sourceMap } },
        {
          loader: 'css-loader',
          options: { sourceMap: sourceMap, importLoaders: 2 }
        },
        { loader: 'postcss-loader', options: { sourceMap: sourceMap } },
        { loader: 'less-loader', options: { sourceMap: sourceMap } }
      ],
      include: resolve('src')
    })
  }
  return loaders
}

module.exports = function (env, cssPreprocessor) {
  const commonLoaders = getCommonLoaders()
  const cssLoaders = getCssLoaders(env, cssPreprocessor)
  const loaders = []
  <% if(esLint){ -%>
  if (env === 'local') {
    loaders.push(lintLoader)
  }
  <%} -%>
  Array.prototype.push.apply(loaders, [...commonLoaders, ...cssLoaders])
  return loaders
}
