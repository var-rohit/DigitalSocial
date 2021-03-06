const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.get('/sign-up',usersController.signUp);
router.get('/total',usersController.totalUsers);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
router.post('/update/:id',usersController.update);
router.get('/sign-out',usersController.destroySession);
router.post('/reset-pwd-complete/:id',usersController.resetComplete);
//submiting email id to get reset link route
router.post('/password-reset',usersController.resetPwd);



//use passport as a middleware to authenticate it
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}
),usersController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope : ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect : '/users/sign-in'
}),usersController.createSession);


module.exports = router;