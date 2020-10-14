//mongoose package acts as a middle layer between your express server and database
const mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb://localhost/digitalsocial_development');

//acquire the connection
const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log('Successfully connected to database');

});

module.exports = db;