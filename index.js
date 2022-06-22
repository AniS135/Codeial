const express=require("express");
const expressLayouts=require('express-ejs-layouts');

const db= require('./config/mongoose');

const app=express();

const port=8000;

app.use(expressLayouts);
app.use(express.static(__dirname + '/assets'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express router
app.use('/',require('./routes'));

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port ${port}`);
});