module.exports = function renderEjs () {
    return function (req, res, next) {
        let renderEjs = function (ejs, data) {
            const NODE_ENV = process.env.NODE_ENV;
            data.nodeEnv = NODE_ENV;
            data.jsFiles = [];
            if (NODE_ENV === 'development') {
                let fileName = ejs.split('.')[0];
                // 'bootstrapCss', 'vendor' 为webpack提取的公共模块，如果新增公共模块，需同步jsFiles
                data.jsFiles = [`js/${fileName}`, 'bootstrapCss', 'vendor']; 
            }
            res.render(ejs, data);
        };
        res.renderEjs = renderEjs;
        next();
    } 
}