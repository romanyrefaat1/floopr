const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/mount.ts",
  output: {
    filename: "floopr-feedback.js",
    path: path.resolve(__dirname, "dist"),
    library: "FlooprFeedback",
    libraryTarget: "umd",
    globalObject: "this",
    publicPath: "/scripts/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
