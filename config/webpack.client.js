const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output : {
    filename: 'c-bundle.js',
    publicPath:'/',
    path: path.resolve(__dirname, '../public')  
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
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
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      __IS_BROWSER__: 'true',
    }),
  ]
}
