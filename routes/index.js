/*
  All API endpoint names
  Routes traffic to controllers
*/
const express = require('express');
const user_controller = require('../controllers/user');

const router = express.Router();

router.post('/user', user_controller.createUser);

module.exports = router;
