var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: __dirname, //path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: ["./src/client/client.js"],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader'
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: "client.min.[hash].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: "index.html",
    filename: "index.html",
    inject: "body",
  }),
    // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    // Adds webpack HMR support. It act's like livereload,
    // reloading page after webpack rebuilt modules.
    // It also updates stylesheets and inline assets without page reloading.
    new webpack.HotModuleReplacementPlugin(),
  ],
};
