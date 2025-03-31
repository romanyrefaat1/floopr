const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/embed.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "floopr-feedback-modal-timeout.js",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};