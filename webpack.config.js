const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/client/js/";

module.exports = {
  entry: {
    main: BASE_JS + "main.js",
    comment: BASE_JS + "comment.js",
    videoRecord: BASE_JS + "videoRecord.js",
    videoPlayer: BASE_JS + "videoPlayer.js",
    like: BASE_JS + "like.js",
  },
  // mode도 따로 cammand에서 보내줌
  // watch: true, -> watch는 development에서만 사용해야 하므로, 배포할 땐 삭제 -> development command에 따로추가
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
