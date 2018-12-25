var nodemailer = require('nodemailer');

exports.sendEmail = function (name, email, message) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sender@gmail.com',
            pass: 'password'
        }
      });
      
    var mailOptions = {
        from: 'sender@gmail.com',
        to: 'receiver@gmail.com',
        subject: '[Website] ' + name,
        text: '- name : ' + name + '\n\n- email : ' + email + '\n\n- message : ' + message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
