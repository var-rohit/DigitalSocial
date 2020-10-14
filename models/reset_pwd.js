const mongoose = require('mongoose');
const User = require('./user');

const resetPwdSchema = new mongoose.Schema({
    
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'

    },
    access_token : {
        type : String,
        required : true
    },
    isValid : {
        type : Boolean,
        required : true
    }

},{
    timestamps : true
});

//collection name
const ResetPwd = mongoose.model('ResetPwd',resetPwdSchema);
module.exports = ResetPwd;