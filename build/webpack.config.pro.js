const config = require('./webpack.config.base');
const path = require('path');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const findSync = require('./getEntryFile');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, '../src');

// 获取所有入口文件
let entries = {};
let entryFiles = findSync(path.resolve(ROOT_PATH, '../src/js'));
entryFiles.forEach((val) => {
    let name = val.split('.')[0];
    entries[name] = [path.resolve(APP_PATH, `./js/${val}`)]
})

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
entryFiles.forEach((item) => {
    let name = item.split('.')[0];
    config.plugins.push(new HtmlWebpackPlugin({
        filename: `view/${name}.ejs`,
        template: path.resolve(APP_PATH, `../src/view/${name}.ejs`),
        chunks:[name, 'bootstrapCss', 'vendor'],
        title: name
    }))
})
// config.plugins.push(
//     new HtmlWebpackPlugin({
//         filename: 'view/home.ejs',
//         template: path.resolve(APP_PATH, '../src/view/home.ejs'),
//         chunks:['home', 'bootstrapCss', 'vendor'],
//         title: 'home'
//     }),
//     new HtmlWebpackPlugin({
//         filename: 'view/menu.ejs',
//         template: path.resolve(APP_PATH, '../src/view/menu.ejs'),
//         chunks:['menu', 'bootstrapCss', 'vendor'],
//         title: 'menu'
//     })
// )
config.plugins.push(new ExtractTextPlugin('css/[name]-[hash:8].css')); // 提取css文件
config.plugins.push(new optimizeCss()); // 压缩css文件

module.exports = config;