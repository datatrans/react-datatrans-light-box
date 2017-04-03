const path = require('path')
const webpack = require('webpack')


module.exports = {
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loader: 'babel-loader',
      // include: ['../../shared'],
      exclude: /node_modules/,
      // query: env.babelQuery,
    }]

  },
  entry: {
    main: ['./src/index.js'],

  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
       screw_ie8: true,
        warnings: false, // ...but do not show warnings in the console (there is a lot of them)
      },
      comments: false,
    }),
  ],

  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    library: 'LightBox',
    libraryTarget: 'umd',
    // umdNamedDefine: true
  },

  // resolve: {
  //   modules:[path.resolve(__dirname, '../../shared'), 'node_modules']
  // }
}
