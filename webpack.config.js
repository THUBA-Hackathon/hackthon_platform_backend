const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// https://ic0.app/api/v2/canister/cy4dw-nqaaa-aaaai-qhy3a-cai/query
const LOCAL_II_CANISTER =
  //"http://rrkah-fqaaa-aaaaa-aaaaq-cai.localhost:8000/#authorize";
  //"https://uwb3sezexv0i.ngrok2.xiaomiqiu.cn/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai";
  "https://identity.ic0.app/#authorize"

function initCanisterEnv() {
  let localCanisters, prodCanisters;
  try {
    localCanisters = require(path.resolve(
      ".dfx",
      "local",
      "canister_ids.json"
    ));
  } catch (error) {
    console.log("No local canister_ids.json found. Continuing production");
  }
  try {
    prodCanisters = require(path.resolve("canister_ids.json"));
  } catch (error) {
    console.log("No production canister_ids.json found. Continuing with local");
  }

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === "production" ? "ic" : "local");

  const canisterConfig = network === "local" ? localCanisters : prodCanisters;

  return Object.entries(canisterConfig).reduce((prev, current) => {
    const [canisterName, canisterDetails] = current;
    prev[canisterName.toUpperCase() + "_CANISTER_ID"] =
      canisterDetails[network];
    return prev;
  }, {});
}
const canisterEnvVariables = initCanisterEnv();

const isDevelopment = process.env.NODE_ENV !== "production";

const frontendDirectory = "hackthon_platform_assets";

const asset_entry = path.join("src", frontendDirectory, "src", "index.html");

// const screenWidth = /Android|webOS|iPhone|iPad|BlackBerry|iPad/i.test(navigator.userAgent) ? 750 : 1366 

module.exports = {
  target: "web",
  mode: isDevelopment ? "development" : "production",
  entry: {
    // The frontend.entrypoint points to the HTML file for this build, so we need
    // to replace the extension to `.js`.
    index: path.join(__dirname, asset_entry).replace(/\.html$/, ".jsx"),
  },
  devtool: isDevelopment ? "source-map" : false,
  optimization: {
    minimize: !isDevelopment,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    fallback: {
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      events: require.resolve("events/"),
      stream: require.resolve("stream-browserify/"),
      util: require.resolve("util/"),
    },
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist", frontendDirectory),
  },
  // 'plugins': {
  //   'px2rem-ui-exclude': {
  //     remUnit: 145.11,
  //     exclude: /node_modules|folder_name/i
  //   }
  // },

  // Depending in the language or framework you are using for
  // front-end development, add module loaders to the default
  // webpack configuration. For example, if you are using React
  // modules and CSS as described in the "Adding a stylesheet"
  // tutorial, uncomment the following lines:
  module: {
    rules: [
      { test: /\.(js|ts)x?$/, loader: "ts-loader" },
      {
        test: /\.css$/, use: [
          'style-loader',
          'css-loader',
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                require("postcss-preset-env")({
                  autoprefixer: {
                    flexbox: "no-2009",
                  },
                  stage: 3,
                }),
                require('postcss-px-to-viewport')({
                  viewportWidth: 1454, // (Number) The width of the viewport.
                  // viewportHeight: 1440, // (Number) The height of the viewport.
                  unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
                  viewportUnit: "vw", // (String) Expected units.
                  selectorBlackList: [], // (Array) The selectors to ignore and leave as px.
                  minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                  mediaQuery: false // (Boolean) Allow px to be converted in media queries.
                }),

                //关键:设置px2rem
                // px2rem({
                //     remUnit: 145.11,//这里最开始写的是75，但是antd的样式变的可小，查询后看人家设置的是37.5，然后试了下确实好了
                //     exclude: /node_modules|folder_name/i,
                // }),
              ],
            }
          }

        ]
      },
      { test: /\.(png|jpe?g|gif|svg|ico|json)$/i, type: "asset/resource", },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, asset_entry),
      cache: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src", frontendDirectory, "assets"),
          to: path.join(__dirname, "dist", frontendDirectory),
        },
      ],
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      LOCAL_II_CANISTER,
      ...canisterEnvVariables,
    }),
    new webpack.ProvidePlugin({
      Buffer: [require.resolve("buffer/"), "Buffer"],
      process: require.resolve("process/browser"),
    }),
  ],
  // proxy /api to port 8000 during development
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
    historyApiFallback: true,
    hot: true,
    watchFiles: [path.resolve(__dirname, "src", frontendDirectory)],
    liveReload: true,
  },
};
