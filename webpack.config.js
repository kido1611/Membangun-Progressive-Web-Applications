const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template/index.html",
            filename: "index.html"
        })
    ],
    mode: "production"
}