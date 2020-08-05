const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output : {
    filename: 'c-bundle.js',
    path: path.resolve(__dirname, '../build')  
  },
  resolve: {
    extensions: ['.js', '.jsx','.json', '.css'],
  },
  module: {
    rules: [
      {
        test:/\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] } } ]
          ],
          plugins:['@babel/plugin-proposal-class-properties']
        }
      },
      {
        test: /\.css$/,
        use: [
          'raw-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __IS_BROWSER__: 'true',
    }),
  ]
}
