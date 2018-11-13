const fs = require('fs');
const path = require('path');

// 获取所有入口文件
module.exports = function findSync (startPath) {
    let result = [];
    let join = path.join;
    function finder (path) {
        let files= fs.readdirSync(path);
        files.forEach((val, index) => {
            let fPath= join(path, val);
            let stats= fs.statSync(fPath);
            // if(stats.isDirectory()) finder(fPath);
            if(stats.isFile()) result.push(val);
        });

    }
    finder(startPath);
    return result;
}