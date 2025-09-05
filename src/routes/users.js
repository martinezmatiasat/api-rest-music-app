
const express = require('express');
const router = express.Router();
const userController = require('@/controllers/userController.js');
const { checkAuth } = require('@/middlewares/auth.js');

// Get
router.get('/test', checkAuth, userController.test);
router.get('/get/:id', checkAuth, userController.getUser);

// Post
router.post('/create', userController.createUser);
router.post('/login', userController.login);

// Patch
router.patch('/update/:id', checkAuth, userController.updateUser);

// Delete
//router.delete('/delete/:id', checkAuth, userController.deleteUser);

module.exports = router;