const express = require('express');
const router = express.Router();
const homeRoute = require('./home');
const menuRoute = require('./menu');

router.use(homeRoute);
router.use(menuRoute);

module.exports = router