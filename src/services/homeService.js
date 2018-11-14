import { Select } from '../../utils/sql';

const homeService = {
    infoReq: async (req, res) => {
        let target = {};
        // 开源项目列表
        let projectSql = Select(['*'], ['home_page_menus'], 'type="project"');
        let projectData = await req.mysql(projectSql);
        target.projectData = projectData;
        // 人才培养列表
        let trainSql = Select(['*'], ['home_page_menus'], 'type="train"');
        let trainData = await req.mysql(trainSql);
        target.trainData = trainData;
        let articleSql = Select(['*'], ['article_list']); 
        let articleData = await req.mysql(articleSql);
        target.articleData = articleData;
        return target;
    }
}

export default homeService;