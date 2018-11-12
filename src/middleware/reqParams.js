module.exports = function reqParams () {
    return function (req, res, next) {
        let params = {};
        params.query = req.query; // get请求参数
        params.path = req.path; // http请求路径
        params.cookies = req.cookies; // cookie
        params.body  = req.body; // post请求参数
        req.reqParams = params;
        next();
    }
}