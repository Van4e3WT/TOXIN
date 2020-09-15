const fs = require("fs")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

// Custom variables
const PATHS = {
    src: path.resolve(__dirname, "src"),
    dist: path.resolve(__dirname, "dist"),
}

const PAGES_DIR = path.join(PATHS.src, "pug", "pages")
const PAGES = fs.readdirSync(PAGES_DIR).filter(filename => filename.endsWith(".pug"))

const isDev = process.env.NODE_ENV === "development"

// Custom functions (yep, and arrows)
const cssLoader = addition => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            },
        },
        "css-loader",
    ]
    if(addition) {
        loaders.push(addition)
    }
    return loaders
}

// Main config
module.exports = {
    context: PATHS.src,
    entry: ["@babel/polyfill", "./index.js"],
    output: {
        filename: "bundle_[id].js",
        path: PATHS.dist,
    },
    plugins:[
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style_[id].css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                  from: path.resolve(__dirname, "src/static"), to: path.resolve(__dirname, "dist/static"),
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoader(),
            },
            {
                test: /\.pug$/,
                use: ["pug-loader"]
            },
            {
                test: /\.(scss|sass)$/,
                use: cssLoader("sass-loader")
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"]
            },
            {
                test: /\.csv$/,
                use: ["csv-loader"]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-env"]
                  }
                }
            }
        ]
    },
    devServer: {
        port: 8081,
        hot: isDev,
    },
}