const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',  // Server side. Not for client browser
  entry: './server/index.js',
  output : {
    filename: 's-bundle.js',
    path: path.resolve(__dirname, '../build')  
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
            ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } } ]
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
      __IS_BROWSER__: 'false',
    })
  ],
  externals: [webpackNodeExternals()]
}
