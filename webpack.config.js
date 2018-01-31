const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'prop-types': {
      react: {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types'
      }
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
        screw_ie8: true,
        warnings: false, // ...but do not show warnings in the console (there is a lot of them)
        unused: true,
        dead_code: true, // big one--strip code that will never execute
        warnings: false, // good for prod apps so users can't peek behind curtain
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true, // strips console statements
        sequences: true,
        booleans: true,
      },
      comments: false,
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
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
