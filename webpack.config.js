const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { NODE_ENV } = process.env;
module.exports = {
  entry: resolve(__dirname, "./src/index"),
  output: {
    filename: "[name].bundle.[chunkhash].js",
    path: resolve(`${__dirname}/dist`),
    publicPath: "/",
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
          filename: "[name][ext]",
        },
      },
    ],
  },

  mode: NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "./src/index.html"),
    }),
    new BrowserSyncPlugin(
      {
        host: "localhost",
        port: 3000,
        proxy: "http://localhost:9000/",
      },
      {
        reload: false,
      }
    ),

    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 9000,
    client: {
      logging: "info",
    },
  },
};
