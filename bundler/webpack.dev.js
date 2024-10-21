const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');

module.exports = merge(commonConfiguration, {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    open: true,
  },
  devtool: 'eval-source-map',
});
