const express=require('express');
const expressLayouts=require('express-ejs-layouts');

const router=express.Router();
const homeController= require('../controllers/home_controller');

console.log("Router loaded");

router.use(expressLayouts);

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

router.use('/api',require('./api'));

//for any further routes access from here
// router.use('/routerName',require('./routerFile'));


module.exports=router;