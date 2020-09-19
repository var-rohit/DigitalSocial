const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//parse cookie data
app.use(cookieParser());

//to decode form data in key : value pair
app.use(express.urlencoded({extended: true}));

//to add css styles to pages
app.use(express.static('./assets'));

//we need to add layout prior to routes , as views will be
//rendered in routes
app.use(expressLayouts);

//extract style and scripts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//use express router
app.use('/',require('./routes')); // it takes by default index.js 

//to render ejs pages
app.set('view engine','ejs');

app.set('views','./views');

//server is lisitening on given port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`); 
    
})