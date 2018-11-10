import { Select } from '../../utils/sql';

const homeService = {
    infoReq: async (req, res) => {
        let sql = Select(['*'], ['city_info'], 'id=1');
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

export default homeService;