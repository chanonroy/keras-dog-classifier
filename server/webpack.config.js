var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require('path');

var BASE_DIR = path.resolve(__dirname, './static');
var SRC_DIR = path.join(BASE_DIR, './src');
var DIST_DIR = path.join(BASE_DIR, './dist');

const config = {
    entry: {
        main: path.join(SRC_DIR, './js/index.js') 
    },
    output: {
        path: DIST_DIR,
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                // CSS Loader
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader?minimize", // css-loader?minimize
                ]
            },
            {
                // Style Loaders (Sass, PostCSS)
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader?minimize", // css-loader?minimize
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]'
                },
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        })
    ]
};

module.exports = config;
