import { Select } from '../../utils/sql';

const menuService = {
    infoReq: async (req, res, query) => {
        let target = {};
        let sql = Select(['*'], ['article_list'], `id=${query.id}`);
        let projectData = await req.mysql(sql);
        target.projectData = projectData;
        return target;
    }
}

export default menuService; 