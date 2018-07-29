var webpack = require('webpack');
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
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: "css-loader?minimize"
                },
                {
                    loader: "postcss-loader",
                    options: { plugins() { return [require('autoprefixer')({ browsers: ['last 3 versions'] })]; } }
                },
                {
                    loader: "sass-loader"
                }
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]'
                },
            }
        ]
    }
};

module.exports = config;
