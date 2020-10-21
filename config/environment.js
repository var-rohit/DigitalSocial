const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const morgan = require('morgan');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval : '1d',
    path : logDirectory
});

const development = {
    name : 'development',
    asset_path :'./assets',
    session_cookie_key : 'something',
    db : 'digitalsocial_development',
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : '########################',
            pass : '#############################'
        } 
    },
    
    google_client_id : "595573587800-p7cqbjn0phglg7tsgj5gqs7pe2eod4df.apps.googleusercontent.com",
    google_client_secret : "1-Jsddz_jp5kYbmP_73SzIvB",
    google_call_back_url : "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'Digitalsocial',
    morgan : {
        mode : 'dev',
        options : {stream : accessLogStream}
    } 
}

const production = {
    name : 'production',
    asset_path :process.env.DIGITAL_SOCIAL_ASSET_PATH,
    session_cookie_key : process.env.DIGITALSOCIAL_SESSION_COOKIE_KEY,
    db : process.env.DIGITALSOCIAL_DB,
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : process.env.DIGITALSOCIAL_GMAIL_USERNAME,
            pass : process.env.DIGITALSOCIAL_GMAIL_PWD
        } 
    },
    
    google_client_id : process.env.DIGITALSOCIAL_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.DIGITALSOCIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url : process.env.DIGITALSOCIAL_GOOGLE_CALLBACK_URL,
    jwt_secret : process.env.DIGITALSOCIAL_JWT_SECRET,
    morgan : {
        mode : 'combined',
        options : {stream : accessLogStream}
    } 
}

module.exports = eval(process.env.DIGITAL_SOCIAL_ENVIRONMENT) == undefined ? development : eval(process.env.DIGITAL_SOCIAL_ENVIRONMENT);