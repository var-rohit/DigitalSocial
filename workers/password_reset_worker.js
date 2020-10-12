const queue = require('../config/kue');

const passwordResetMailer = require('../mailers/reset_pwd_mailer');

//process function
//it tells the worker to run this function when any new task(email) comes in queue.
queue.process('resetpwd',function(job,done){
    console.log("processing a job ",job.data);
    passwordResetMailer.resetPwd(job.data);

    done();

})