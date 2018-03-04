const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  target: 'web',

  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'js/app.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(frag|vert|obs)$/,
        use: 'raw-loader'
      },
      {
        test: /\.(mp3|png)$/,
        use: [
          { loader: 'file-loader', options: { name: 'assets/[hash].[ext]' } }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),

    new HtmlWebpackPlugin({
      title: 'polymint',
      filename: 'index.html',
      template: 'src/index.ejs'
    }),

    new UglifyJsPlugin()
  ]
}
