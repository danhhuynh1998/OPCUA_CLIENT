const nodemailer = require('nodemailer');

var maillist = [
    'danhhq2210@gmail.com',
    '1610389@hcmut.edu.vn',
    'tttranducdung@gmail.com',
    '1610565@hcmut.edu.vn'
  ];

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'opc.ua.thesis@gmail.com',
        pass: 'luanvank16'
    }
});

let mailOptions = {
    from: 'opc.ua.thesis@gmail.com',
    to: maillist,
    subject: 'Test',
    text: 'Hello World!'
};
module.exports = function () {
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error.message);
    }
    console.log('send email successfully');
});
}