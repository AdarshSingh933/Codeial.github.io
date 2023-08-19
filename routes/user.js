 const express = require('express');
 const router = express.Router();
 const passport = require('passport');
 
 const userController= require('../controllers/userController');


 router.get('/profile/:id',passport.checkAuthentication,userController.profile);
 router.get('/sign-up',userController.signUp);
 router.get('/sign-in',userController.signIn);
 router.post('/create',userController.create);
 router.post('/update/:id',userController.update);
//  router.get('/update-password/:id',userController.updatePassword);

//  router.post('/create-session',userController.createSession);
 router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}
 ),userController.createSession);

 router.get('/sign-out',userController.destroySession);

 router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
 router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/sign-in'}),userController.createSession);

 module.exports = router;