const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
    static:{
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
  ignoreWarnings: [
    /critical dependency:/i,
    /node_modules\/esbuild\/lib\/main.js/,
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^uglify-js$|^@swc\/core$/,
    }),
  ],
  module: {
    rules: [
      {
        test: /.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.html$/i,
        loader: "html-loader",
      },
      {
        test: /.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.d\.ts$/,
        use: "ignore-loader",
      },
    ],
  },
  resolve:{
    fallback:{
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      constants: require.resolve("constants-browserify"),
      crypto: require.resolve("crypto-browserify"),
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      tty: require.resolve("tty-browserify"),
      util: require.resolve("util/"),
      zlib: require.resolve("browserify-zlib"),
      fs: false,
      http: false,
      https: false,
      url: false,
      vm: false,
      querystring: false,
      child_process: false,
      worker_threads: false,
      inspector: false,
      module: false,
    },
  },
  stats: {
    errorDetails: true,
  },
}