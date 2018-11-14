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

config.optimization = {};
config.optimization.splitChunks = {};
config.optimization.splitChunks.cacheGroups = {
    // 注意: priority属性
    // 其次: 打包业务中公共代码
    bootstrapCss: {
        name: "bootstrapCss",
        test: /\.css$/,
        chunks: "all",
        minSize: 30000,
        enforce: true,
        priority: 20
    },
    // 首先: 打包node_modules中的文件
    vendor: {
        name: "vendor",
        test: /[\\/]node_modules[\\/]/,
        chunks: "all",
        priority: 10
    }
}

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
                    limit: 8192,
                    name: 'imgs/[name]-[hash:8].[ext]'
                }
            },
            {
                loader: 'image-webpack-loader' // 压缩图片
            }
        ]
    }, {
        test: /\.ejs$/,
        loader: 'html-loader'
    }
]

// 根据html模板生成对应页面
entryFiles.forEach((item) => {
    let name = item.split('.')[0];
    config.plugins.push(new HtmlWebpackPlugin({
        filename: `view/${name}.ejs`,
        template: path.resolve(APP_PATH, `../src/view/${name}.ejs`),
        chunks:[name, 'bootstrapCss', 'vendor'],
        title: name
    }))
})

config.plugins.push(new ExtractTextPlugin('css/[name]-[hash:8].css')); // 提取css文件
config.plugins.push(new optimizeCss()); // 压缩css文件

module.exports = config;