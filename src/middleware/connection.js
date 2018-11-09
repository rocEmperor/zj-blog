module.exports = function connect (connection) {
    return function (req, res, next) {
        let queryFn = function (sql) {
            return new Promise (function (resolve, reject) {
                connection.query(sql, function (err, result) {
                    if(err){
                        console.log('[mysql Error] - ', err.message);
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            })
        }
        req.mysql = queryFn;
        next();
    }
}