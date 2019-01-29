"use strict";
var path = require("path");
var webpack = require("webpack");

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const extractSass = new MiniCssExtractPlugin({
  filename: "css/[name].css",
  chunkFilename: "css/[id].css"
});

var options = {

  mode: 'development',

  entry: {
    // Le coeur de l'application
    app: ["./app/src/main.js"]
  },

  output: {
    path: path.join(__dirname, "app/build"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  resolve: {
    extensions: [
      ".js",
      ".json",
    ],
    modules: ["./app/src", "./app/src/libs", "node_modules"]
  },

  devtool: "eval",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },

      {
        include: /\.pug/,
        loader: 'pug-html-loader'
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          'css-loader',
          'sass-loader',
        ]
      },

    ],
  },

  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },

  plugins: (
    [
      extractSass,
      // On expose des proxy pour les dépendances des librairies
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        _: 'underscore',
        q: 'q',
        Backbone: 'backbone',
        Marionette: 'backbone.marionette',
      }),
    ]
  ),
  

}

module.exports = options;
