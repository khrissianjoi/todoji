/*
  All API endpoint names
  Routes traffic to controllers
*/
const express = require('express');
const user_controller = require('../controllers/user');
const folder_controller = require('../controllers/folder')

const router = express.Router();

router.post('/user', user_controller.createUser);

router.get('/user', user_controller.getUser);

router.get('/users', user_controller.getUsers);

router.post('/folder', folder_controller.createFolder);

router.get('/folders', folder_controller.getFolders);
  
module.exports = router;
