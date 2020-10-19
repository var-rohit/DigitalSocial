const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
//used for authentication of user while signing in
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');
const passportJWT = require('./config/passport-jwt-stratergy');
const passportGoogle = require('./config/passport-google-oauth2-stratergy');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//setup the chat server to use with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000");


//parse cookie data
app.use(cookieParser());


//to decode form data in key : value pair
app.use(express.urlencoded({extended: true}));

//to add css styles to pages
app.use(express.static('./assets'));
//make the uploads path available
app.use('/uploads',express.static(__dirname + '/uploads'));

//we need to add layout prior to routes , as views will be
//rendered in routes
app.use(expressLayouts);

//extract style and scripts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




//to render ejs pages
app.set('view engine','ejs');

app.set('views','./views');

//mongo store is used to store the session cookie in db
app.use(session({
    name : 'digitalsocial',
    //TODO : change the secret before production deployment
    secret : 'something',
    //when user has not logged in , so extra data is not required to be stored in session cookie
    saveUninitialized : false,
    //when session data is already stored, we do not want to re-write it
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store : new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    }),function (err){
            console.log(err  || 'connect-mongodb setup ok');
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
//use express router
app.use('/',require('./routes')); // it takes by default index.js 


//server is lisitening on given port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`); 
    
})