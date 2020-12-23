const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all"
    }
  };

  if (isProd) {
    config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserPlugin()];
  }

  return config;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-proposal-class-properties"]
      }
    }
  ];

  if (isDev) {
    loaders.push("eslint-loader");
  }

  return loaders;
};

const styleLoader = () => {
  if (isProd) {
    return MiniCssExtractPlugin.loader;
  }
  return "style-loader";
};

module.exports = {
  target: isDev ? "web" : "browserslist",
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    app: ["@babel/polyfill", "./app.js"]
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: isDev ? "./" : "/quote-of-the-day/"
  },
  optimization: optimization(),
  devtool: isDev ? "source-map" : false,
  devServer: {
    publicPath: "/",
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    hot: true,
    inline: true,
    compress: true,
    disableHostCheck: true,
    port: 3000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, ".nojekyll"),
          to: path.resolve(__dirname, "dist")
        },
        {
          from: path.resolve(__dirname, "images/favicon.ico"),
          to: path.resolve(__dirname, "dist")
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },
      {
        test: /\.css$/,
        use: [styleLoader(), "css-loader"]
      },
      {
        test: /\.less$/,
        use: [styleLoader(), "css-loader", "less-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ]
  }
};
