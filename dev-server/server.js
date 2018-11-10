require('babel-register');

// const hotMiddleware = require('webpack-hot-middleware');
const devMiddleware = require('webpack-dev-middleware');
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const nunjucks  = require('nunjucks');
const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer  = require('multer');
const config = require('../build/webpack.config.dev');
const ejs = require('ejs');
const compiler = webpack(config);
const routes = require('../src/routes/index');
const port = 7000;
const connection = require('../src/connectMysql/connect');
const connectMiddleware = require('../src/middleware/connection');
const reqParamsMiddleware = require('../src/middleware/reqParamsMiddleware');
const NODE_ENV = process.env.NODE_ENV;

const app = new express();
const upload = multer({ dest: 'upload/' }); // 用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。

app.use(bodyParser.urlencoded({ extended: false })); // 用于处理 请求体JSON, Raw, Text 和 URL 编码的数据。
app.use(bodyParser.json());
app.use(cookieParser()); // 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。

// 开发环境和生产环境对应源文件目录不同
let ejsSrc = '';
if (NODE_ENV === 'development') {
    ejsSrc = '../src/view'
} else if (NODE_ENV === 'production') {
    ejsSrc = '../dist/view'
}
app.set('views', path.join(__dirname , ejsSrc) );
app.engine('.html', ejs.__express); 
app.set('view engine', 'html');

// app.set('view engine', 'html'); 
// app.set('views', path.join(__dirname, '../src/view'));
// nunjucks.configure('views', { autoescape: true, express: app });

// 将connection.query方法挂载到req上
app.use(connectMiddleware(connection));

// 整合http请求参数到req.reqParams上
app.use(reqParamsMiddleware());

app.use(devMiddleware(compiler, {
    noInfo: true,
    // 如果false，将会给你列出一大堆无聊的信息。
    publicPath: 'http://127.0.0.1:7000/scripts/',
    stats: {
        colors: true
    }
}));
// 路由入口
app.use('/', routes);
// app.use(hotMiddleware(compiler));
app.listen(port, () => {
    console.log('server start on 127.0.0.1:7000');
});