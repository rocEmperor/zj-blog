import homeService from '../services/homeService';

module.exports = {
    info: async (req, res) => {
        const data = await homeService.infoReq(req, res);
        res.render('home.ejs', data);
    }
}