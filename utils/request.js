import { erorrRequest } from './utils';

export function mineRequest(url, data, method = 'POST') {
  return new Promise((resolve, reject) => {
    let rootName = 'https://test-apiweb.elive99.com';
    console.log(`${rootName}${url}`)
    $.ajax({
        url: `${rootName}${url}`,
        timeout: 20000,
        type: method,
        data: {
            data: JSON.stringify(data)
        },
        success: function (data) {
            let { errCode, data, errMsg } = res.data;
            if (errCode == 0) {
                resolve(data);
            } else {
                erorrRequest(errMsg);
                reject(errMsg);
            }
        },
        complete: function (res) { },
        error: function (jqXHR, textStatus, errorThrown) {
            erorrRequest(`${textStatus} --- ${errorThrown}`)  
        }
    })
  })
}