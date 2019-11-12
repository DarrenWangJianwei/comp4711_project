const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();
<<<<<<< HEAD

router.get('/', loginController.getLogin);
=======
router.get("/login",loginController.userLogin)
>>>>>>> 3a39d40f788b363d0b156020d8990d4adcc60619

module.exports = router;