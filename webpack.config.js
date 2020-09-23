const path = require("path");

module.exports = {
  mode: "production",
  entry: "./getCharacter.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
    filename: "getCharacter.es5.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  target: "web",
  externals: /k6(\/.*)?/,
  devtool: "source-map",
};
