/*
  All API endpoint names
  Routes traffic to controllers
*/
const express = require('express');
const hello_controller = require('../controllers/hello');

const router = express.Router();

router.get('/hello', hello_controller);

module.exports = router;
