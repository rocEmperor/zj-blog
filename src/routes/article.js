const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');

router.get('/article', function (req, res) {
    articleController.info(req, res);
})

module.exports = router;