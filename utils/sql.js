import { isArray, isString, erorrRequest } from "util";

function joinArray (params) {
    let res = '';
    if (params.length === 1) {
        res = params.join('');
    } else {
        res = params.join(',');
    }
    return res;
}

/**
 * sql新增
 * @param {Array} keys 查询的字段名
 * @param {Array} tables 被查询的表
 * @param {String} conditions 查询筛选条件
 */
export function Select (keys, tables, conditions) {
    let sqlString = '';
    if (!keys || !tables || !conditions) {
        erorrRequest('Select params has undefined !');
        return;
    } else {
        if (!isArray(keys) || !isArray(tables) || !isString(conditions)) {
            erorrRequest('Select params exist type error !');
            return;
        }
    }
    sqlString = `SELECT ${joinArray(keys)} FROM ${joinArray(tables)} WHERE ${conditions}`;
    return sqlString;
}
export function Delete () {
    
}
// 新增
export function Insert () {
    
}
// 编辑
export function Update () {
    
}