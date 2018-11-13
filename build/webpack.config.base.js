const path = require('path');
const webpack = require('webpack');
const findSync = require('./getEntryFile');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, '../src');
const BUILD_PATH = path.resolve(ROOT_PATH, '../dist');
const NODE_ENV = process.env.NODE_ENV;

// 获取所有入口文件
let entries = {};
let entryFiles = findSync(path.resolve(ROOT_PATH, '../src/js'));
entryFiles.forEach((val) => {
    let name = val.split('.')[0];
    entries[name] = [path.resolve(APP_PATH, `./js/${val}`)]
})

let config = {
    entry: {
        // app: [
        //     // 这里reload=true的意思是，如果碰到不能hot reload的情况，就整页刷新。
        //     'webpack-hot-middleware/client?reload=true', ENTRY_PATH
        // ]
        ...entries
    },
    output: {
        path: BUILD_PATH,
        filename: NODE_ENV === 'production' ? 'js/[name]-[hash:8].js' : 'js/[name].js',
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
    optimization: {
        splitChunks: {
          cacheGroups: {
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
        }
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