const express = require('express');
const router = express.Router();
const menuController = require('../controller/menuController');

router.get('/menu', function (req, res) {
    menuController.info(req, res);
})

module.exports = router;