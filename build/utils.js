const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./config')

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

function subDir (dir) {
  return path.posix.join(config[process.env.BUILD_ENV].SUB_DIR, dir)
}

function getCssLoaders () {
  let env = process.env.NODE_ENV
  let isLocal = env === 'local'
  let isProd = env === 'production'
  let sourceMap = !isProd
  let lastLoader = isLocal ? 'vue-style-loader' : MiniCssExtractPlugin.loader
  const loaders = [
    {
      test: /\.css$/,
      use: [
        { loader: lastLoader },
        {
          loader: 'css-loader',
          options: { sourceMap: sourceMap },
        },
      ],
      include: [resolve('src'), resolve('node_modules')],
    }
    <% if(css === 'sass'){ -%>,{
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
      }
    <%} -%>
    <% if(css === 'less'){ -%>,{
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
      }
    <%} -%>
  ]
  return loaders
}

module.exports = {
  resolve,
  subDir,
  getCssLoaders
}
