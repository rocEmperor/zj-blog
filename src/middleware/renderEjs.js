module.exports = function renderEjs () {
    return function (req, res, next) {
        let renderEjs = function (ejs, data) {
            const NODE_ENV = process.env.NODE_ENV;
            data.nodeEnv = NODE_ENV;
            data.jsFiles = '';
            if (NODE_ENV === 'development') {
                let fileName = ejs.split('.')[0];
                // 开发模式下，需要引用webpack-dev-middleware打包到内存的资源，jsFiles是对应js资源的路径
                data.jsFiles = `${fileName}`; 
            }
            res.render(ejs, data);
        };
        res.renderEjs = renderEjs;
        next();
    } 
}