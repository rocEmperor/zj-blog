import { Select } from '../../utils/sql';

const menuService = {
    infoReq: async (req, res) => {
        let sql = Select(['*'], ['home_page_menus'], 'id=1');
        let data = await req.mysql(sql);
        let target = {};
        data.map((item) => {
            target.id = item.id;
            target.city = item.city;
            target.describe  = item.describe ;
        })
        // console.log(target, ';;;;;;;;;;;;;;;;;')
        return target;
    }
}

export default menuService;