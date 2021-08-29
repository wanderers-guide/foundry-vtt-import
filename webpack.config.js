const path = require("path");

const config = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  output: {
    filename: "module.js",
    path: path.resolve(__dirname, "build"),
  },
};

module.exports = config;
