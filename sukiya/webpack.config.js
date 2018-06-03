const path = require('path');

module.exports = {
  mode: 'development',
  entry: './server/public/src/index.js',
  module:{
    rules:[{test: /\.js$/,exclude: /node_modules/,loader: 'babel-loader'}]
  },
  output: {
    path: path.resolve(__dirname, './server/public/dist'),
    filename: 'bundle.js',
    publicPath:'/dist'
  }
};