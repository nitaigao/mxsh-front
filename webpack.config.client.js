const path    = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin')

const PRODUCTION  = process.env.NODE_ENV === 'production'
const DEVELOPMENT = process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development'

function flat(input) {
  return [].concat(...input)
}

function ifDev(input) {
  if (DEVELOPMENT) return input
  return []
}

function ifProd(input) {
  if (PRODUCTION) return input
  return []
}

const config = {
  entry: flat([
    'babel-polyfill',
    ifDev('webpack-hot-middleware/client'),
    ifDev('react-hot-loader/patch'),
    './src/client/index.jsx'
  ]),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{ loader: 'eslint-loader', options: { rules: { semi: 0 } } }]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /dist/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', query: { modules: true, sourceMaps: false } },
            { loader: 'postcss-loader' }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: [
      '.js', '.jsx', '.json'
    ]
  },
  plugins: flat([
    ifDev(new webpack.HotModuleReplacementPlugin()),
    ifDev(new webpack.NoEmitOnErrorsPlugin()),
    new CopyWebpackPlugin([
      { from: path.join('src', 'static') }
    ]),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(DEVELOPMENT),
      __PROD__: JSON.stringify(PRODUCTION)
    }),
    new ExtractTextPlugin('[name]-[hash].css'),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.resolve('dist')
    }),
    ifProd(new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'production'"
    })),
    ifProd(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }))
  ])
}

module.exports = config
