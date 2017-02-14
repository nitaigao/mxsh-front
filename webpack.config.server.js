const path          = require('path')
const webpack       = require('webpack')
const nodeExternals = require('webpack-node-externals')

const PRODUCTION  = process.env.NODE_ENV === 'production'
const DEVELOPMENT = process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development'

const config = {
  entry:  './src/server/index.js',
  output: {
    path:     path.join(__dirname, 'dist'),
    filename: 'server.js'
  },
  target: 'node',
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
    ]
  },
  resolve: {
    extensions: [
      '.js', '.jsx', '.json'
    ]
  },
  externals: nodeExternals({}),
  plugins: [
    new webpack.DefinePlugin({
      __DEV__:               JSON.stringify(DEVELOPMENT),
      __PROD__:              JSON.stringify(PRODUCTION)
    })
  ]
}

if (PRODUCTION) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'"
      }
    })
  )
  // config.plugins.push(
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // )
}

module.exports = config