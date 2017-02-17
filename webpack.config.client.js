const path    = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin')

const PRODUCTION  = process.env.NODE_ENV === 'production'
const DEVELOPMENT = process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development'

const config = {
  entry:  ['babel-polyfill', './src/client/index.jsx'],
  output: {
    path:     path.join(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{loader: 'eslint-loader', options: {rules: {semi: 0}}}]
      },
      {
        test:    /\.jsx?$/,
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
            { loader: 'postcss-loader'  }
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
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'src', 'static') }
    ]),
    new webpack.DefinePlugin({
      __DEV__:                JSON.stringify(DEVELOPMENT),
      __PROD__:               JSON.stringify(PRODUCTION)
    }),
    new ExtractTextPlugin('[name]-[chunkhash].css'),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.resolve(__dirname, './dist')
    })
  ]
}

if (PRODUCTION) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'production'"
    })
  )
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  )
}

module.exports = config