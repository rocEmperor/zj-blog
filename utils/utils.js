export function erorrRequest (err) {
    console.log(`request error: ${err}`)
}

export function isArray (params) {
    let is = false;
    if (!parms) { console.log('isArray params is undefined !'); return };
    let type = Object.prototype.toString.call(params);
    if (type === '[object Array]') {
        is = true;
    }
    return is;
} 

export function isString (params) {
    let is = false;
    if (!parms) { console.log('isString params is undefined !'); return };
    let type = Object.prototype.toString.call(params);
    if (type === '[object String]') {
        is = true;
    }
    return is;
} 