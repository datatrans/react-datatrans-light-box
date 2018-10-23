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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: true,
      output: {
        comments: false,
      },
      compress: {
        screw_ie8: true, // eslint-disable-line camelcase
        warnings: false,
        unused: true,
        dead_code: true, // eslint-disable-line camelcase
        drop_debugger: true, // eslint-disable-line camelcase
        conditionals: true,
        evaluate: true,
        drop_console: true, // eslint-disable-line camelcase
        sequences: true,
        booleans: true,
      },
      comments: false,
    })
  ],

  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    library: 'Lightbox',
    libraryTarget: 'umd',
    // umdNamedDefine: true
  },

  // resolve: {
  //   modules:[path.resolve(__dirname, '../../shared'), 'node_modules']
  // }
}
