const express=require('express');
const expressLayouts=require('express-ejs-layouts');

const router=express.Router();
const usersController= require('../controllers/users_controller');

router.use(expressLayouts);

router.get('/profile',usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/')

module.exports=router;