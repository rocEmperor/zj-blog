const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, '../src');
const ENTRY_PATH = path.resolve(APP_PATH, 'index.js');
const BUILD_PATH = path.resolve(ROOT_PATH, '../dist');

let config = {
    entry: {
        // app: [
        //     // 这里reload=true的意思是，如果碰到不能hot reload的情况，就整页刷新。
        //     'webpack-hot-middleware/client?reload=true', ENTRY_PATH
        // ]
        home: path.resolve(APP_PATH, './js/home.js'),
        cunt: path.resolve(APP_PATH, './js/home.js')
    },
    output: {
        path: BUILD_PATH,
        filename: 'js/[name]-[hash:8].js',
        chunkFilename: "[name].js"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'], // 后缀名自动补全
        alias: {
            '@': `${APP_PATH}/`
        },
        modules: [
            'node_modules',
            'src'
        ]
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            }, {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
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
    },
    plugins: [
        // 在js文件中使用 $ 时自动加载jquery，不用单独import
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

module.exports = config;