const path    = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const PRODUCTION  = process.env.NODE_ENV === 'production'
const DEVELOPMENT = process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development'

const config = {
  entry:  ['babel-polyfill', './src/client/index.jsx'],
  output: {
    path:     path.join(__dirname, 'dist'),
    filename: 'bundle.js'
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
    })
  ]
}

if (PRODUCTION) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  )
}

module.exports = config