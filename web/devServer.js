var config = require('../shared/config.json');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack-dev.config');
console.log('starting bundler');
var webpackDevServer = new WebpackDevServer(webpack(webpackConfig), {
  hot: true,
  //quiet: true,
  //noInfo: false,
  stats: {colors: true},
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true,
  headers: { "Access-Control-Allow-Origin": "*" },
  disableHostCheck: true
});
webpackDevServer.listen(config.proxyPort, "0.0.0.0");