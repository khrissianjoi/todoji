/*
  All API endpoint names
  Routes traffic to controllers
*/
const express = require('express');
const user_controller = require('../controllers/user');
const folder_controller = require('../controllers/folder');
const task_controller = require('../controllers/task')

const router = express.Router();

router.post('/user', user_controller.createUser);

router.get('/user', user_controller.getUser);

router.get('/users', user_controller.getUsers);

router.delete('/user', user_controller.deleteUser);

router.patch('/user', user_controller.patchUser);

router.post('/folder', folder_controller.createFolder);

router.get('/folders', folder_controller.getFolders);

router.get('/folder', folder_controller.getFolder);

router.delete('/folder', folder_controller.deleteFolder);

router.patch('/folder', folder_controller.patchFolder);

router.post('/task', task_controller.postTask);

router.get('/tasks', task_controller.getTasks);

router.get('/task', task_controller.getTask);

router.get('/tasks', task_controller.getTask_UserFolder);

module.exports = router;
