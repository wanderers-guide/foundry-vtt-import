const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const config = (env, options) => {
  const isDev = options.mode === "development";
  const devDir = process.env.LOCAL_FOUNDRY_MODULE_PATH || __dirname;
  const prodDir = process.env.PROD_BUILD_PATH || __dirname;

  return {
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
      path: path.resolve(isDev ? devDir : prodDir, "build"),
    },
  };
};

module.exports = config;
