const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

//process function
//it tells the worker to run this function when any new task(email) comes in queue.
queue.process('emails',function(job,done){
    console.log("worker of emails is processing a job ",job.data);
    commentsMailer.newComment(job.data);

    done();

})