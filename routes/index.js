/*
  All API endpoint names
  Routes traffic to controllers
*/
const express = require('express');
const user_controller = require('../controllers/user');
const folder_controller = require('../controllers/folder');
const task_controller = require('../controllers/task')
const note_controller = require('../controllers/note')

const router = express.Router();

// User endpoint
router.post('/user', user_controller.createUser);

router.get('/user', user_controller.getUser);

router.get('/users', user_controller.getUsers);

router.delete('/user', user_controller.deleteUser);

router.patch('/user', user_controller.patchUser);

// Folder endpoint
router.post('/folder', folder_controller.createFolder);

router.get('/folders', folder_controller.getFolders);

router.get('/folder', folder_controller.getFolder);

router.delete('/folder', folder_controller.deleteFolder);

router.patch('/folder', folder_controller.patchFolder);

// Task endpoint
router.post('/task', task_controller.postTask);

router.get('/tasks', task_controller.getTasks);

router.get('/task', task_controller.getTask);

router.delete('/task', task_controller.deleteTask);

router.patch('/task', task_controller.patchTask);

// Note endpoint
router.post('/note', note_controller.postNote);

router.get('/notes', note_controller.getNotes);

router.get('/note', note_controller.getNote);

router.delete('/note', note_controller.deleteNote);

router.patch('/note', note_controller.patchNote);

module.exports = router;
