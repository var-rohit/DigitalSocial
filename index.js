const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/',require('./routes')); // it takes by default index.js 

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`); 
    
})