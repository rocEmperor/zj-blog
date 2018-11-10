const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');

router.get('/home', function (req, res) {
    homeController.info(req, res);
})

module.exports = router;