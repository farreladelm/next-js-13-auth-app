import nodemailer from 'nodemailer'


export const sendEmail = async ({email, emailType, token} : any) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASSWORD
            }
          });

        const subject = emailType === process.env.VERIFY ? "Verify your email" : "Reset password"
        const url = emailType === process.env.VERIFY ? "verifyemail" : "resetpassword"
        
        const emailOptions = {
            from: process.env.MAILTRAP_USER, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: `<p>Click this <a href="${process.env.DOMAIN}/${url}?token=${token}">link</a> to ${subject}`, // html body
        }
        console.log("send mail")
        const mailResponse = await transporter.sendMail(emailOptions, function(err, data) {
            if(err) {
                // console.log(data)
                console.log(err)
            } else {
                console.log("email send successfully")
            }
        });

        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }

}