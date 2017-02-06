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
      __DEV__:  JSON.stringify(DEVELOPMENT),
      __PROD__: JSON.stringify(PRODUCTION),
      'process.env': {
        NODE_ENV:          JSON.stringify(process.env.NODE_ENV),
        API_HOST:          JSON.stringify(process.env.API_HOST),
        FRONTEND_HOST:     JSON.stringify(process.env.FRONTEND_HOST),
        RAVEN_PUBLIC_DSN:  JSON.stringify(process.env.RAVEN_PUBLIC_DSN),
        RAVEN_PRIVATE_DSN: JSON.stringify(process.env.RAVEN_PRIVATE_DSN)
      }
    })
  ]
}