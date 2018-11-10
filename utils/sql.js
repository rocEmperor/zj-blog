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
        erorrRequest('Select_sql params has undefined !');
        return;
    } else {
        if (!isArray(keys) || !isArray(tables) || !isString(conditions)) {
            erorrRequest('Select_sql params exist type error !');
            return;
        }
    }
    sqlString = `SELECT ${joinArray(keys)} FROM ${joinArray(tables)} WHERE ${conditions}`;
    return sqlString;
}
/**
 * 删除
 * @param {String} table 对应操作的表名
 * @param {String} conditions 筛选删除的某一条表数据
 */
export function Delete (table, conditions) {
    let sqlString = '';
    if (!table || !conditions) {
        erorrRequest('Delete_sql params has undefined !');
        return;
    } else {
        if (!isString(table) || !isString(conditions)) {
            erorrRequest('Delete_sql params exist type error !');
            return;
        } 
    }
    sqlString = `DELETE FROM ${table} WHERE ${conditions}`;
    return sqlString;
}
/**
 * 新增
 * @param {String} table 对应操作的表名
 * @param {Array} keys 对应插入行中的key
 * @param {Array} values 对应插入行中的value
 */
export function Insert (table, keys, values) {
    let sqlString = '';
    if (!table || !keys || !values) {
        erorrRequest('Insert_sql params has undefined !');
        return;
    } else {
        if (!isString(table) || !isArray(keys) || !isArray(values)) {
            erorrRequest('Insert_sql params exist type error !');
            return;
        } 
    }
    sqlString = `INSERT INTO ${table} ( ${joinArray(keys)} ) VALUES ( ${joinArray(values)} )`;
    return sqlString;
}
/**
 * 编辑
 * @param {String} table 对应操作的表名
 * @param {Array} files 对应操作行中的key，value; 例 field1=value1
 * @param {Array} conditions 查询筛选条件
 */
export function Update (table, files, conditions) {
    let sqlString = '';
    if (!table || !files || !conditions) {
        erorrRequest('Update_sql params has undefined !');
        return;
    } else {
        if (!isString(conditions) || !isArray(keys) || !isArray(values)) {
            erorrRequest('Update_sql params exist type error !');
            return;
        } 
    }
    sqlString = `UPDATE ${table} SET ${joinArray(files)} WHERE ${conditions}`;
    return sqlString;
}