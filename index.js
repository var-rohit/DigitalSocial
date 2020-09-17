const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

//we need to add layout prior to routes , as views will be
//rendered in routes
app.use(expressLayouts);
//extract style and scripts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes')); // it takes by default index.js 

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`); 
    
})