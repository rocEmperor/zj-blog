module.exports = {
    infoReq: async (req, res) => {
        let sql = 'SELECT * FROM city_info WHERE id=1';
        let data = await req.mysql(sql);
        let target = {};
        data.map((item) => {
            target.id = item.id;
            target.city = item.city;
            target.maio_shu = item.maio_shu;
        })
        console.log(target, ';;;;;;;;;;;;;;;;;')
        return target;
    }
}