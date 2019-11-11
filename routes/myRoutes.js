const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();
router.get("/login",loginController.userLogin)

module.exports = router;