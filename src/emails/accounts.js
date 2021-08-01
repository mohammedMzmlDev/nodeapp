const sgMail = require('@sendgrid/mail')
const sendgridApiKey = process.env.sendGridApiKey;
sgMail.setApiKey(sendgridApiKey)
sgMail.send({
    to : 'mohammedmuzammildev@gmail.com',
    from : 'mohammedmuzammildev@gmail.com',
    subject : 'this is subject',
    text : 'this is text',
})