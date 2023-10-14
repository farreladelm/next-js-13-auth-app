import nodemailer from 'nodemailer'


export const sendEmail = async ({email, emailType, token} : any) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "7cfd3af08ff6e1",
              pass: "1c9b76e600f52a"
            }
          });

        const subject = emailType === process.env.VERIFY ? "Verify your email" : "Reset password"
        const url = emailType === process.env.VERIFY ? "verifyemail" : "resetpassword"
        
        const emailOptions = {
            from: '"Farrel Adel Mohammad" farrel.adel@gmail.com', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: `<p>Click this <a href="${process.env.DOMAIN}/${url}?token=${token}">link</a> to ${subject}`, // html body
        }
        const mailResponse = await transporter.sendMail(emailOptions);

        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }

}