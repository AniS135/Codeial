const express=require("express");
const cookieParser=require('cookie-parser');
const expressLayouts=require('express-ejs-layouts');

const db= require('./config/mongoose');
const { urlencoded } = require("express");

// extract style and scripts from sub pages into the layout
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const MongoStore=require('connect-mongodb-session')(session);
const sassMiddleware=require('node-sass-middleware');
const flash = require('connect-flash');
const customMware= require('./config/middleware');

const app=express();

const port=8000;

app.use(sassMiddleware({
    src:'./assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
// Make the uploads path available to the browser
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in db
app.use(session({
    name:'codeial',
    // TODO change the secret before the deployment in production mode
    secret:"blahsomething",
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            uri: 'mongodb://localhost/codeial_db',
            autoRemove: 'disabled '
        },
        function(err){
            console.log(err|| "connect-mongodb setup ok");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);

// use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port ${port}`);
});