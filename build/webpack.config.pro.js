const config = require('./webpack.config.base');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
            use: ["css-loader", "less-loader", "postcss-loader"]
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
    }
]
config.plugins.push(new ExtractTextPlugin("styles.css")); // 提取css文件
config.plugins.push(new optimizeCss()); // 压缩css文件

module.exports = config;