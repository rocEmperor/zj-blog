import menuService from '../services/menuService';

module.exports = {
    info: async (req, res) => {
        const data = await menuService.infoReq(req, res);
        res.renderEjs('menu.ejs', data);
    }
}