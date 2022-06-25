const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const passport=require('passport');

const router=express.Router();
const usersController= require('../controllers/users_controller');

router.use(expressLayouts);

router.get('/profile',usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);

// Use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.createSession);


module.exports=router;