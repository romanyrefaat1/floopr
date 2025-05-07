import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: "./src/embed.tsx",
  output: {
    path: __dirname + "/dist",
    filename: "float-button-bundle_floopr_feedback_embed.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Updated to handle both .ts and .tsx
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
