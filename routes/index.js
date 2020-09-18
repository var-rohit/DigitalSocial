const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const signUpController = require('../controllers/signup_controller');





console.log(`router loaded`);

router.get('/',homeController.home);
router.get('/signup',signUpController.signup);
router.use('/users',require('./users'));



module.exports = router;
