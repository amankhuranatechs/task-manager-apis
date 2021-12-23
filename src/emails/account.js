const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// const msg = {
//     to: 'amankhurana812@gmail.com', // Change to your recipient
//     from: 'amankhuranatechs@gmail.com', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   }
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log('Email sent')
//     })
//     .catch((error) => {
//       console.error(error)
//     })


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email, 
        from: 'amankhuranatechs@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. let me know how you get along with the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email, 
        from: 'amankhuranatechs@gmail.com',
        subject: 'Cancelled successfully!',
        text: `Good bye ${name}, I hope to see you again!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}