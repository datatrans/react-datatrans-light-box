const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  entry: {
    main: ['./src/index.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks:['app'],
      template: 'src/app.html',
      filename: 'app.html',
    })
  ],
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js'
  }
}
