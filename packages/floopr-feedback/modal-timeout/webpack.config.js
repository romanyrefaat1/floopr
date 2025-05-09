import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: "./src/embed.tsx",
  output: {
    path: __dirname + "/dist",
    formate: "iife",
    filename: "modal-timeout-bundle_floopr_feedback_embed.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
};
