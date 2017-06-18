const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const today = new Date().toISOString().split("T")[0];

module.exports = {
  entry: "./src",
  output: {
    path: __dirname,
    filename: "bundle.min.js?v=" + today
  },
  plugins: [
    new ExtractTextPlugin("bundle.min.css?v=" + today),
    new HtmlWebpackPlugin({
      inject: false,
      template: require("html-webpack-template"),
      appMountId: "app",
      title: "Alarm Web App",
      filename: "index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /(\.scss$|\.css$)/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["react", "es2015", "stage-2"]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
