import articleService from '../services/articleService';

module.exports = {
    info: async (req, res) => {
        let { reqParams } = req;
        let { query } = reqParams;
        if (!query.hasOwnProperty('id')) {
            res.send('id 参数未传!');
        }
        if (!query.id) {
            res.send('无效的id 参数!');
        }
        const data = await articleService.infoReq(req, res, query);
        res.renderEjs('article.ejs', data);
    }
}