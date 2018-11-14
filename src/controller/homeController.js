import homeService from '../services/homeService';

module.exports = {
    initInfo: async (req, res) => {
        const data = await homeService.infoReq(req, res);
        res.renderEjs('home.ejs', data);
    }
}