const express = require('express');
const router = express.Router();
const adminController = require('@/controllers/adminController.js');

router.get('/test', adminController.test);
router.post('/create', adminController.createAdmin);
router.patch('/update-password/:id', adminController.updatePassword);

module.exports = router;