const webpack = require('webpack');
const config = require('./webpack/webpack.config');
const compiler = webpack(config)

compiler.watch({}, () => {
  console.log('ok')
});