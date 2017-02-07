const path    = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const PRODUCTION  = process.env.NODE_ENV === 'production'
const DEVELOPMENT = process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development'

module.exports = {
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
      __DEV__:               JSON.stringify(DEVELOPMENT),
      __PROD__:              JSON.stringify(PRODUCTION),
      __API_HOST__:          JSON.stringify(process.env.API_HOST),
      __FRONTEND_HOST__:     JSON.stringify(process.env.FRONTEND_HOST),
      __RAVEN_PUBLIC_DSN__:  JSON.stringify(process.env.RAVEN_PUBLIC_DSN),
      __RAVEN_PRIVATE_DSN__: JSON.stringify(process.env.RAVEN_PRIVATE_DSN),
      'process.env': {
        NODE_ENV:            JSON.stringify(process.env.NODE_ENV),
      }
    })
  ]
}