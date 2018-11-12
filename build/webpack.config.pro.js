const config = require('./webpack.config.base');
const path = require('path');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, '../src');

/*
 * mode = 'production'，会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin,
 * ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
 * */
config.mode = 'production';

config.module.rules = [
    {
        test: /(\.jsx|\.js)$/,
        use: {
            loader: "babel-loader"
        },
        exclude: /node_modules/
    }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader"]
        })
    }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader", "less-loader"]
        })
    }, {
        test: /\.(png|jpg|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    },
    {
        test: /\.ejs$/,
        loader: 'html-loader'
    }
]
config.plugins.push(
    new HtmlWebpackPlugin({
        filename: 'view/home.ejs',
        template: path.resolve(APP_PATH, '../src/view/home.ejs'),
        chunks:['home'],
        title: 'home'
    }),
    new HtmlWebpackPlugin({
        filename: 'view/cunt.ejs',
        template: path.resolve(APP_PATH, '../src/view/home.ejs'),
        chunks:['cunt'],
        title: 'count'
    })
)
config.plugins.push(new ExtractTextPlugin('css/[name].css')); // 提取css文件
config.plugins.push(new optimizeCss()); // 压缩css文件

module.exports = config;