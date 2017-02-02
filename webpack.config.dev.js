var path    = require('path');
var webpack = require('webpack');

module.exports = {
  entry:  [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/client'
  ],
  output: {
    path:     path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src/shared'],
    extensions:         ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
    ],
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_HOST: JSON.stringify(process.env.API_HOST),
        FRONTEND_HOST: JSON.stringify(process.env.FRONTEND_HOST)
      }
    })
  ],
  devtool: 'inline-source-map'
};