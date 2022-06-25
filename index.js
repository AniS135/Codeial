const express=require("express");
const cookieParser=require('cookie-parser');
const expressLayouts=require('express-ejs-layouts');

const db= require('./config/mongoose');
const { urlencoded } = require("express");

// extract style and scripts from sub pages into the layout
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const app=express();

const port=8000;

app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);
app.use(express.static(__dirname + '/assets'));


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    // TODO change the secret before the deployment in production mode
    secret:"blahsomething",
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port ${port}`);
});