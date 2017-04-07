const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loader: 'babel-loader',
      // include: ['../../shared'],
      // exclude: [/node_modules/],
      // query: env.babelQuery,
    }]

  },
  entry: {
    main: ['./src/index.js'],

  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false, // ...but do not show warnings in the console (there is a lot of them)
    //   },
    //   comments: false,
    // }),
    // new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    // new webpack.NoErrorsPlugin(),
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
  },

  // resolve: {
  //   modules:[path.resolve(__dirname, '../../shared'), 'node_modules']
  // }
}
