const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const {path} = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const workboxPlugin = require("workbox-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


const { NODE_ENV } = process.env;
module.exports = {
  entry: resolve(__dirname, "./src/index"),
  output: {
    filename: "[name].bundle.[chunkhash].js",
    path: resolve(`${__dirname}/dist`),
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devtool: NODE_ENV === "production" ? "hidden-source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 5 versions",
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(woff\woff2\/eot\ttf\/otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]",
        },
      },
    ],
  },

  mode: NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "PowerBody",
      template: resolve(__dirname, "./src/index.html"),
    }),



    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/manifest.json", to: "" },
        { from: "./src/assets/icon", to: "img/" },
      ],
    }),
    new workboxPlugin.InjectManifest({
      maximumFileSizeToCacheInBytes: 5000 * 50000,
      swSrc: "./src/sw.ts",
      swDest: "sw.js",
    }),
    
  ],

  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    open: true,
    port: 9000,
 
    client: {
      logging: "info",
    },
  },
};

