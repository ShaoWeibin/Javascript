var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
      path: __dirname + '/dist',
      filename: "bundle.js"
  },
  module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['react']
            }
        },
      },
      {
          test: /\.css$/,
          use: "style-loader!css-loader"
      }]
  }
};
