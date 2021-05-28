const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = process.env.SENDGRID_API_DEV

sgMail.setApiKey(sendgridAPIKey)

// sgMail.send({
//     to:'nchitha493@gmail.com',
//     from:'nchitham493@gmail.com',
//     subject: 'This is my first creation!',
//     text: 'Send Message'
// }).then(() => {
//     console.log('Message sent')
// }).catch((error) => {
//     console.log(error.response.body)
//     // console.log(error.response.body.errors[0].message)
// })

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to:email,
        from:'nchitham493@gmail.com',
        subject: 'Welcome Emails',
        text: `Test Wecome ${name}`
    }).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })
}

module.exports = {
    sendWelcomeEmail
}